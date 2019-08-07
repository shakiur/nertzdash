module NertzStreakSingles
  module_function

  def stat_type
    StatsController::SINGLES
  end

  def description
    "Longest nertzed streak for singles."
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
          .pluck(:nertz).each do |has_nertzed|
          count += 1 if has_nertzed
          count = 0 if !has_nertzed
          streaks << count
        end
      end
      longest_streak = streaks.max
      data[team.name] = longest_streak if longest_streak > 1
    end
    return data.sort_by { |name, streak| streak }.reverse
  end
end
