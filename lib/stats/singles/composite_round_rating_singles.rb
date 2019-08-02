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

    Game.all.each do |game|
      rounds_by_number = game.rounds.group_by(&:round_number)
      rounds_by_number.values.each do |rounds_in_number|
        next if skip_rating_for_insignificant_rounds?(rounds_in_number)
        composite_ratings = derive_composite_ratings_for_given_rounds(rounds_in_number)
        composite_ratings.each do |team_name, rating|
          data[team_name] = [] unless data.key? team_name
          data[team_name] << rating
        end
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
  def self.derive_composite_ratings_for_given_rounds(rounds)
    ratings_by_team_name = {}
    round_scores = rounds.map(&:score)
    total_score_distribution = round_scores.max - round_scores.min

    rounds.each do |round|
      rating = (round.score - round_scores.min).to_f / total_score_distribution
      ratings_by_team_name[round.team.name] = rating
    end

    return ratings_by_team_name
  end

  def self.skip_rating_for_insignificant_rounds?(rounds)
    # Composite ratings for rounds are insignificant if all teams receive the same score
    round_scores = rounds.map(&:score)
    return true if round_scores.max == round_scores.min
    # Skip rating if rounds comprise of non-homogenous team types
    return true if rounds.any? { |round| round.team.doubles? }
    return false
  end
end
