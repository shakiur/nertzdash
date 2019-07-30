module WinPercentageSingles
  module_function

  def team_type
    Team::SINGLES
  end

  def description
    "Win percentage of players per game. Only accounts for players who have played at minimum of 10 rounds across 2 or more games."
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
    winning_team_games = Game.all.map { |game|
      game.winning_team_game
    }.select { |team_game|
      team_game.team.singles?
    }
    total_number_of_games = winning_team_games.count

    winning_team_games.map(&:team).uniq.each do |team|
      next unless team.rounds.count >= 10
      next unless team.team_games.count >= 2

      number_of_times_won = winning_team_games.count { |team_game|
        team_game.team_id == team.id
      }
      win_percentage = (number_of_times_won.to_f / total_number_of_games) * 100
      data[team.name] = win_percentage.round
    end

    return data.sort_by { |name, score| score }.reverse
  end
end
