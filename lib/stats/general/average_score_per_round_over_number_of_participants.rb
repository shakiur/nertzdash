module AverageScorePerRoundOverNumberOfParticipants
  module_function

  def stat_type
    StatsController::GENERAL
  end

  def description
    "Average score per round based on the number of teams participating in a game."
  end

  def graph_type
    :line_chart
  end

  def graph_options
    {
      xtitle: 'Number of participants',
      ytitle: 'Average score per round'
    }
  end

  def data
    data = {}


    return data.sort_by { |num_participants, avg_score| avg_score }.reverse
  end
end
