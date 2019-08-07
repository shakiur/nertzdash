module NegativeScoreStreakSingles
  module_function

  def stat_type
    StatsController::SINGLES
  end

  def description
    "Longest negative scores streak for singles. Only displays streaks of 3 or longer."
  end

  def graph_type
    :column_chart
  end

  def graph_options
    {
      xtitle: 'Player',
      ytitle: 'Streak length'
    }
  end

  def data
    data = {}
    Team.singles.each do |team|
      streaks = [0]
      team.team_games.each do |team_game|
        count = 0
        team_game.rounds
          .sort_by(&:round_number)
          .map { |round| round.score < 0 }.each do |is_negative|
          count += 1 if is_negative
          count = 0 if !is_negative
          streaks << count
        end
      end
      longest_streak = streaks.max
      data[team.name] = longest_streak if longest_streak >= 3
    end
    return data.sort_by { |name, streak| streak }.reverse
  end
end
