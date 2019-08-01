module PositiveScoreStreakDoubles
  module_function

  def team_type
    Team::DOUBLES
  end

  def description
    "Longest positive scores streak for doubles. Only displays streaks of 3 or longer."
  end

  def graph_type
    :column_chart
  end

  def graph_options
    {
      xtitle: 'Team',
      ytitle: 'Streak length'
    }
  end

  def data
    data = {}
    Team.doubles.each do |team|
      streaks = [0]
      team.team_games.each do |team_game|
        count = 0
        team_game.rounds
          .sort_by(&:round_number)
          .map { |round| round.score > 0 }.each do |is_positive|
          count += 1 if is_positive
          count = 0 if !is_positive
          streaks << count
        end
      end
      longest_streak = streaks.max
      data[team.name] = longest_streak if longest_streak > 2
    end
    return data.sort_by { |name, streak| streak }.reverse
  end
end
