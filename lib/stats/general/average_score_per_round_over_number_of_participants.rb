module AverageScorePerRoundOverNumberOfParticipants
  module_function

  def stat_type
    StatsController::GENERAL
  end

  def description
    "A composite rating from 0 to 1000 on the average performance of a player round over round, where a 1000 would be a top scorer in that round, and a 0 would be the bottom scorer in that round. Tracks the significance of relative performance to players within the same round. Only considers players with a minimum of 10 rounds played."
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


    return data.sort_by { |name, rating| rating }.reverse
  end
end
