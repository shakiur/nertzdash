module MedianScoreSingles
  module_function

  def team_type
    Team::SINGLES
  end

  def description
    "Median score of singles teams per round. Does not account for players wth less than five rounds on record."
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
      next unless team.rounds.count >= 5
      scores = team.rounds.pluck(:score).sort
      median_index = (scores.count.to_f / 2).ceil
      median_score = scores[median_index]
      data[team.name] = median_score
    end
    return data.sort_by { |name, score| score }.reverse
  end
end
