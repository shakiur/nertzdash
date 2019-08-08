module NumberOfRoundsPlayedOverTime
  module_function

  def stat_type
    StatsController::GENERAL
  end

  def description
    "Volume of rounds played over time - overall, singles, and doubles."
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
    overall_data = {}
    singles_data = {}
    doubles_data = {}

    Round
      .joins(:game, :team)
      .select('games.date, teams.team_type')
      .group_by { |round|
        round.date.beginning_of_month
      }.each do |month_date, rounds|
      overall_data[month_date] = rounds.size
      singles_data[month_date] = rounds.select { |round| round.team_type == Team::SINGLES }.size
      doubles_data[month_date] = rounds.select { |round| round.team_type == Team::DOUBLES }.size
    end

    return [
      {
        name: 'Overall count',
        data: overall_data.sort_by { |month_date, num_rounds| month_date }
      },
      {
        name: 'Singles count',
        data: singles_data.sort_by { |month_date, num_rounds| month_date }
      },
      {
        name: 'Doubles count',
        data: doubles_data.sort_by { |month_date, num_rounds| month_date }
      }
    ]
  end
end
