module CompositeRoundRatingSingles
  module_function

  def team_type
    Team::SINGLES
  end

  def description
    "A composite rating from 0 to 100 on the average performance of a player round over round, where a 100 would be a top scorer in that round, and a 0 would be the bottom scorer in that round."
  end

  def graph_type
    :column_chart
  end

  def graph_options
    {
      xtitle: 'Player',
      ytitle: 'Rating'
    }
  end

  def data
    data = {}

    [Game.find(63)].each do |game|
      rounds_by_number = game.rounds.group_by(&:round_number)
      rounds_by_number.values.each do |rounds_in_number|
        composite_ratings = derive_composite_ratings_for_given_rounds(rounds_in_number)
        composite_ratings.each do |team_name, rating|
          data[team_name] = [] unless data.key? team_name
          data[team_name] << rating
        end
      end
    end

    averaged_rating_data = {}
    data.each do |team_name, rating_array|
      averaged_rating_data[team_name] = rating_array.sum.to_f / rating_array.count
    end

    return averaged_rating_data.sort_by { |name, rating| rating }.reverse
  end

  private
  def self.derive_composite_ratings_for_given_rounds(rounds)
    ratings_by_team_name = {}
    total_score_distribution = rounds.map { |round| round.score.abs }.sum
    rounds.each do |round|
      rating = (round.score.to_f / total_score_distribution)
      ratings_by_team_name[round.team.name] = rating
    end

    return ratings_by_team_name
  end
end
