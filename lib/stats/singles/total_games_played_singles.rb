module TotalGamesPlayedSingles
  module_function

  def team_type
    Team::SINGLES
  end

  def description
    "Total number of games played for singles."
  end

  def graph_type
    :column_chart
  end

  def graph_options
    {
      xtitle: 'Player',
      ytitle: 'Games played'
    }
  end

  def data
    data = {}
    Team.singles.each do |team|
      num_games_played = team.team_games.count
      data[team.name] = num_games_played if num_games_played > 0
    end
    return data.sort_by { |name, game_count| game_count }.reverse
  end
end
