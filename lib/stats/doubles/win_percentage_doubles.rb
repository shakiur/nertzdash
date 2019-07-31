module WinPercentageDoubles
  module_function

  def team_type
    Team::DOUBLES
  end

  def description
    "Win percentage of teams that have won at least once. Only accounts for teams who have played at minimum of 8 rounds. Note that a Team that has only played once together and won can have a 100% win rate."
  end

  def graph_type
    :column_chart
  end

  def graph_options
    {
      xtitle: 'Team',
      ytitle: 'Win percentage'
    }
  end

  def data
    data = {}
    winning_team_games = Game.all.map { |game|
      game.winning_team_game
    }.select { |team_game| team_game.doubles? }

    winning_team_games.map(&:team).uniq.each do |team|
      next unless team.rounds.count >= 8

      number_of_times_won = winning_team_games.count { |team_game|
        team_game.team_id == team.id
      }
      total_number_of_games_played = TeamGame.where(team_id: team.id).count

      win_percentage = (number_of_times_won.to_f / total_number_of_games_played) * 100
      data[team.name] = win_percentage.round
    end

    return data.sort_by { |name, score| score }.reverse
  end
end
