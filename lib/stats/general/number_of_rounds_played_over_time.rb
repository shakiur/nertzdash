module NumberOfRoundsPlayedOverTime
  module_function

  def stat_type
    StatsController::GENERAL
  end

  def description
    "Volume of rounds played over time."
  end

  def graph_type
    :area_chart
  end

  def graph_options
    {
      xtitle: 'Date',
      ytitle: 'Number of rounds',
      discrete: true
    }
  end

  def data
    data = {}

    Round
      .joins(:game)
      .select('games.date')
      .group_by { |round|
        round.date.beginning_of_month
      }.each do |month_date, rounds|
      data[month_date] = rounds.size
    end

    return data.sort_by { |month_date, num_rounds| month_date }
  end
end
