module ChartHelper
  # Helper for generating ChartKick graph UI given lib/stats/* module params
  def stats_builder(graph_type:, data:, graph_options: {})
    self.send(graph_type, data, graph_options)
  end

  # Graphs a round number series of Teams' total scores
  # @param game [Game] Given Game to create chart for
  def line_chart_total_score_over_rounds(team_games_with_colors:)
    max_score = -99999
    min_score = 99999
    scores_data = []
    team_games_with_colors.keys.each do |team_game|
      scores_series = {}
      running_score = 0
      scores_series[0] = running_score
      team_game.rounds.sort_by(&:round_number).each do |round|
        running_score += round.score
        scores_series[round.round_number] = running_score

        min_score = running_score if running_score < min_score
        max_score = running_score if running_score > max_score
      end
      scores_data << {
        name: team_game.team.name,
        data: scores_series
      }
    end

    return line_chart(
        scores_data,
        xtitle: 'Round number',
        ytitle: 'Total score',
        discrete: true,
        points: true,
        curve: false,
        legend: false,
        min: min_score,
        max: max_score,
        colors: team_games_with_colors.values
      )
  end
end
