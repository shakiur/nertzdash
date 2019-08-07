module MedianScoreSingles
  module_function

  def stat_type
    StatsController::SINGLES
  end

  def description
    "Median score of singles players per round. Only accounts for players who have played at minimum of 10 rounds across 2 or more games."
  end

  def graph_type
    :column_chart
  end

  def graph_options
    {
      xtitle: 'Player',
      ytitle: 'Median score'
    }
  end

  def data
    data = {}
    Team.singles.each do |team|
      next unless team.rounds.count >= 10
      next unless team.team_games.count >= 2

      scores = team.rounds.pluck(:score).sort
      median_index = (scores.count.to_f / 2).ceil
      median_score = scores[median_index]
      data[team.name] = median_score
    end
    return data.sort_by { |name, score| score }.reverse
  end
end
