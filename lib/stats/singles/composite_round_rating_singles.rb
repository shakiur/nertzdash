module CompositeRoundRatingSingles
  module_function

  def team_type
    Team::SINGLES
  end

  def description
    "A composite rating from 0 to 100 on the average performance of a player round over round, where a 100 would be a top scorer in that round, and a 0 would be the bottom scorer in that round. Tracks the significance of relative performance to players within the same round."
  end

  def graph_type
    :column_chart
  end

  def graph_options
    {
      xtitle: 'Player',
      ytitle: 'Rating',
      min: 0,
      max: 100
    }
  end

  def data
    data = {}

    data_set = Round.joins(:team).where(teams: { team_type: Team::SINGLES }).group_by { |round| [round.game_id, round.round_number] }
    data_set.values.each do |rounds_in_number|
      round_scores = rounds_in_number.map(&:score)
      scores_min = round_scores.min
      scores_max = round_scores.max

      next if skip_for_nonsignificant_rounds?(min: scores_min, max: scores_max)

      composite_ratings = derive_composite_ratings_for_given_rounds(
        rounds: rounds_in_number,
        min: scores_min,
        max: scores_max
      )
      composite_ratings.each do |team_name, rating|
        data[team_name] = [] unless data.key? team_name
        data[team_name] << rating
      end
    end

    averaged_rating_data = {}
    data.each do |team_name, rating_array|
      next if rating_array.empty?
      rating = (rating_array.sum.to_f / rating_array.count) * 100
      averaged_rating_data[team_name] = rating.round
    end

    return averaged_rating_data.sort_by { |name, rating| rating }.reverse
  end

  private
  def self.derive_composite_ratings_for_given_rounds(rounds:, min:, max:)
    ratings_by_team_name = {}
    total_score_distribution = max - min

    rounds.each do |round|
      rating = (round.score - min).to_f / total_score_distribution
      ratings_by_team_name[round.team.name] = rating
    end

    return ratings_by_team_name
  end

  # Composite ratings for rounds are insignificant if all teams receive the same score
  def self.skip_for_nonsignificant_rounds?(min:, max:)
    return min == max
  end
end
