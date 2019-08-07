module TotalGamesPlayedDoubles
  module_function

  def stat_type
    StatsController::DOUBLES
  end

  def description
    "Total number of games played for doubles."
  end

  def graph_type
    :column_chart
  end

  def graph_options
    {
      xtitle: 'Team',
      ytitle: 'Games played'
    }
  end

  def data
    data = {}
    Team.doubles.each do |team|
      num_games_played = team.team_games.count
      data[team.name] = num_games_played if num_games_played > 0
    end
    return data.sort_by { |name, game_count| game_count }.reverse
  end
end
