module CompositeRoundRatingWeightedSingles
  module_function

  def stat_type
    StatsController::SINGLES
  end

  def description
    "Attempts to derive a weighted Composite Round Rating based on a running average of chronologically calculated CRRs on a per round basis. The weight component is an inverse rating out of 1000 of the relative running rating going into each round, per team. Ideally, this should produce team ratings that are sensitive towards the expected results of each round (based on team rating) versus the actual results of the round."
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
    data = {}

    included_team_ids = Team
      .singles
      .joins(:rounds)
      .group('teams.id')
      .having('count(team_id) >= 10')
      .pluck(:id)

    data_set = Round
      .joins(:team)
      .where(teams: { id: included_team_ids })
      .group_by { |round| [round.game_id, round.round_number] }

    # Every team starts at 500 rating, out of 1000
    Team.select(:name).where(id: included_team_ids).pluck(:name).each do |team_name|
      data[team_name] = [500]
    end

    # Calculate and assign running weighted ratings for each round number collection of rounds
    data_set.values.each do |rounds_in_number|
      round_scores = rounds_in_number.map(&:score)
      scores_min = round_scores.min
      scores_max = round_scores.max

      next if skip_for_nonsignificant_rounds?(min: scores_min, max: scores_max)

      round_result_ratings = derive_composite_ratings_for_given_rounds(
        rounds: rounds_in_number,
        min: scores_min,
        max: scores_max
      )
      inverse_relative_ratings = derive_inverse_relative_ratings(
        team_ratings: current_rating_by_team(team_ratings_data: data)
      )

      # Derive weighted ratings
      team_names_in_this_round = Team
        .select(:name)
        .where(id: rounds_in_number.pluck(:team_id))
        .pluck(:name)

      team_names_in_this_round.each do |team_name|
        round_result_rating = round_result_ratings[team_name]
        inverse_relative_rating = inverse_relative_ratings[team_name]
        current_composite_rating = data[team_name].last

        weighted_composite_rating = ((round_result_rating + inverse_relative_rating + current_composite_rating).to_f / 3).round
        data[team_name] << weighted_composite_rating
      end
    end

    averaged_rating_data = {}
    data.each do |team_name, rating_array|
      next if rating_array.empty?
      rating = rating_array.sum.to_f / rating_array.count
      averaged_rating_data[team_name] = rating.round
      # averaged_rating_data[team_name] = rating_array.last
    end

    return averaged_rating_data.sort_by { |name, rating| rating }.reverse
  end

  private
  def self.current_rating_by_team(team_ratings_data:)
    current_ratings = {}
    team_ratings_data.each do |team_name, ratings|
      current_ratings[team_name] = ratings.last
    end

    return current_ratings
  end

  def self.derive_inverse_relative_ratings(team_ratings:)
    min = team_ratings.values.min
    max = team_ratings.values.max
    total_rating_distribution = max - min

    # If total rating distribution is zero, that is, every team has the same rating, then simply return
    if total_rating_distribution == 0
      return team_ratings
    end

    relative_ratings = {}
    team_ratings.each do |team_name, rating|
      relative_rating = ((rating - min).to_f / total_rating_distribution) * 1000
      relative_ratings[team_name] = 1000 - relative_rating.round
    end

    return relative_ratings
  end

  def self.derive_composite_ratings_for_given_rounds(rounds:, min:, max:)
    ratings_by_team_name = {}
    total_score_distribution = max - min

    rounds.each do |round|
      rating = (round.score - min).to_f / total_score_distribution
      ratings_by_team_name[round.team.name] = (rating * 1000).round
    end

    return ratings_by_team_name
  end

  # Composite ratings for rounds are insignificant if all teams receive the same score
  def self.skip_for_nonsignificant_rounds?(min:, max:)
    return min == max
  end
end
