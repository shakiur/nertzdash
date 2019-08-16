module CompositeRoundRatingTotal
  module_function

  def stat_type
    StatsController::GENERAL
  end

  def description
    "Takes into account both singles games, as well as attendance in a doubles team. A composite rating from 0 to 1000 on the average performance of a team round over round, where a 1000 would be a top scorer in that round, and a 0 would be the bottom scorer in that round. Tracks the significance of relative performance to players within the same round. Singles ratings are weighted at 67% and doubles ratings are weighted at 33%, since a player only has partial control of the performance of a team. Only considers players/teams with a minimum of 8 rounds played."
  end

  def graph_type
    :column_chart
  end

  def graph_options
    {
      xtitle: 'Player',
      ytitle: 'Rating',
      min: 0,
      max: 1000
    }
  end

  def data
    included_team_ids_singles = Team
      .singles
      .joins(:rounds)
      .group('teams.id')
      .having('count(team_id) >= 8')
      .pluck(:id)

    singles_data_set = Round
      .joins(:team)
      .select('rounds.team_id,
        rounds.game_id,
        rounds.round_number,
        rounds.score,
        teams.name,
        teams.id')
      .where(teams: { id: included_team_ids_singles })
      .group_by { |round| [round.game_id, round.round_number] }

    included_team_ids_doubles = Team
      .doubles
      .joins(:rounds)
      .group('teams.id')
      .pluck(:id)

    doubles_data_set = Round
      .joins(:team)
      .select('rounds.team_id,
        rounds.game_id,
        rounds.round_number,
        rounds.score,
        teams.name,
        teams.id')
      .where(teams: { id: included_team_ids_doubles })
      .group_by { |round| [round.game_id, round.round_number] }

    # Calculate singles data
    data = Hash.new { |h, k| h[k] = [] }
      
    singles_data_set.values.each do |rounds_in_number|
      round_scores = rounds_in_number.pluck(:score)
      scores_min = round_scores.min
      scores_max = round_scores.max

      next if skip_for_nonsignificant_rounds?(min: scores_min, max: scores_max)

      composite_ratings = derive_composite_ratings_for_given_rounds(
        rounds: rounds_in_number,
        min: scores_min,
        max: scores_max
      )
      composite_ratings.each do |team_name, rating|
        data[team_name] << rating
      end
    end

    averaged_rating_data = {}
    data.each do |team_name, rating_array|
      next if rating_array.empty?
      rating = (rating_array.sum.to_f / rating_array.count) * 1000
      averaged_rating_data[team_name] = [rating.round] # Add singles rating
    end

    # Calculate doubles data, per player
    data = Hash.new { |h, k| h[k] = [] }

    doubles_data_set.values.each do |rounds_in_number|
      round_scores = rounds_in_number.pluck(:score)
      scores_min = round_scores.min
      scores_max = round_scores.max

      next if skip_for_nonsignificant_rounds?(min: scores_min, max: scores_max)

      composite_ratings = derive_composite_ratings_for_given_rounds(
        rounds: rounds_in_number,
        min: scores_min,
        max: scores_max
      )
      composite_ratings.each do |team_name, rating|
        Team.find_by(name: team_name).players.flat_map { |player| player.teams.singles.map(&:name) }.each do |singles_team_names|
          data[singles_team_names] << rating # Add doubles ratings per singles player
        end
      end
    end

    data.each do |team_name, rating_array|
      next if rating_array.empty?
      next unless averaged_rating_data.key? team_name

      rating = (rating_array.sum.to_f / rating_array.count) * 1000
      averaged_rating_data[team_name] << rating.round # Add doubles rating
    end

    consolidated_ratings = {}
    averaged_rating_data.each do |name, ratings|
      next unless ratings.size == 2
      singles_rating = ratings[0] # Weight: 67%
      doubles_rating = ratings[1] # Weight: 33%
      final_rating = ((singles_rating * 0.67) + (doubles_rating * 0.33)).round
      consolidated_ratings[name] = final_rating
    end

    return consolidated_ratings.sort_by { |name, rating| rating }.reverse
  end

  private
  def self.derive_composite_ratings_for_given_rounds(rounds:, min:, max:)
    ratings_by_team_name = {}
    total_score_distribution = max - min

    rounds.each do |round|
      rating = (round.score - min).to_f / total_score_distribution
      ratings_by_team_name[round.name] = rating
    end

    return ratings_by_team_name
  end

  # Composite ratings for rounds are insignificant if all teams receive the same score
  def self.skip_for_nonsignificant_rounds?(min:, max:)
    return min == max
  end
end
