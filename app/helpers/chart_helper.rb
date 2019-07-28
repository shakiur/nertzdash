module ChartHelper
  # Graphs a round number series of Teams' total scores
  # @param game [Game] Given Game to create chart for
  def line_chart_total_score_over_rounds(game:)
    max_score = -99999
    min_score = 99999
    scores_data = []
    game.team_games.each do |team_game|
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
        min: min_score,
        max: max_score
      )
  end
end
