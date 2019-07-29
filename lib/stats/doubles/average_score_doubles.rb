module AverageScoreDoubles
  module_function

  def team_type
    Team::DOUBLES
  end

  def description
    "Average score of doubles teams per round. Does not account for teams wth less than five rounds on record."
  end

  def graph_type
    :column_chart
  end

  def graph_options
    {
      xtitle: 'Team',
      ytitle: 'Average score'
    }
  end

  def data
    data = {}
    Team.doubles.each do |team|
      next unless team.rounds.count >= 5
      scores = team.rounds.pluck(:score)
      num_scores = scores.count
      total_score = scores.sum
      data[team.name] = (total_score.to_f / num_scores).round.to_i
    end
    return data.sort_by { |name, score| score }.reverse
  end
end
