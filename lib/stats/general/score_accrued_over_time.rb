module ScoreAccruedOverTime
  module_function

  def stat_type
    StatsController::GENERAL
  end

  def description
    "Volume sum of scores logged over time - positive, negative, and total sum."
  end

  def graph_type
    :area_chart
  end

  def graph_options
    {
      xtitle: 'Date',
      ytitle: 'Accrued scores',
      discrete: true
    }
  end

  def data
    total_data = {}
    positive_data = {}
    negative_data = {}

    rounds = Round.joins(:game).select('games.date, rounds.score').order('games.date')

    total_sum = 0
    positive_sum = 0
    negative_sum = 0
    start_range = rounds.first.date
    end_range = start_range + 2.weeks
    rounds.each do |round|
      score = round.score
      total_sum += score
      positive_sum += score if score.positive?
      negative_sum += score if score.negative?

      # Log statistical data within a 1 week granularity
      if round.date > end_range
        total_data[start_range] = total_sum
        positive_data[start_range] = positive_sum
        negative_data[start_range] = negative_sum

        start_range = round.date
        end_range = start_range + 2.weeks
        total_sum = 0
        positive_sum = 0
        negative_sum = 0
      end
    end

    return [
      {
        name: 'Total',
        data: total_data.sort_by { |date, sum| date }
      },
      {
        name: 'Positive',
        data: positive_data.sort_by { |date, sum| date }
      },
      {
        name: 'Negative',
        data: negative_data.sort_by { |date, sum| date }
      }
    ]
  end
end
