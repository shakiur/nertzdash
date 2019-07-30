module MedianScoreDoubles
  module_function

  def team_type
    Team::DOUBLES
  end

  def description
    "Median score of doubles teams per round. Only accounts for teams who have played at minimum of 8 rounds."
  end

  def graph_type
    :column_chart
  end

  def graph_options
    {
      xtitle: 'Team',
      ytitle: 'Median score'
    }
  end

  def data
    data = {}
    Team.doubles.each do |team|
      next unless team.rounds.count >= 8

      scores = team.rounds.pluck(:score).sort
      median_index = (scores.count.to_f / 2).ceil
      median_score = scores[median_index]
      data[team.name] = median_score
    end
    return data.sort_by { |name, score| score }.reverse
  end
end
