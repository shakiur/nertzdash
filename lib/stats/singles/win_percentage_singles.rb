module WinPercentageSingles
  module_function

  def team_type
    Team::SINGLES
  end

  def description
    "Win percentage of players that have won at least once and have played at minimum of five rounds."
  end

  def graph_type
    :pie_chart
  end

  def graph_options
    {
    }
  end

  def data
    data = {}
    winning_team_games = Game.all.map { |game| game.winning_team_game }
    total_number_of_games = winning_team_games.count { |tg| tg.team.singles? }

    winning_team_games.map(&:team).uniq.each do |team|
      next unless team.singles?
      next unless team.rounds.count >= 5

      number_of_times_won = winning_team_games.count { |tg| tg.team_id == team.id }
      win_percentage = (number_of_times_won.to_f / total_number_of_games) * 100
      data[team.name] = win_percentage.round
    end

    return data.sort_by { |name, score| score }.reverse
  end
end
