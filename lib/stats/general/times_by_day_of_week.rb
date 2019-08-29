module TimesByDayOfWeek
  module_function

  def stat_type
    StatsController::GENERAL
  end

  def description
    "Play Times by Day of Week"
  end

  def graph_type
    :timeline
  end

  def graph_options
    {
      xtitle: 'Day of the week',
      ytitle: 'Time',
      discrete: true
    }
  end

  def data
    overall_data = {}

    monday_start_times = []
    tuesday_start_times = []
    wednesday_start_times = []
    thursday_start_times = []
    friday_start_times = []
    saturday_start_times = []
    sunday_start_times = []

    monday_end_times = []
    tuesday_end_times = []
    wednesday_end_times = []
    thursday_end_times = []
    friday_end_times = []
    saturday_end_times = []
    sunday_end_times = []

    rounds_by_date = {}
    Round.joins(:game, :team).select('games.date, rounds.created_at').each do |round|
      date = round.date
      if date == round.created_at.to_date
        rounds_by_date[date] ||= []
        rounds_by_date[date] << round
      end
    end

    rounds_by_date.each do |date, rounds|
      times = rounds.map(&:created_at)
      start_time = times.min
      end_time = times.max

      if date.monday?
        monday_start_times << start_time
        monday_end_times << end_time
      elsif date.tuesday?
        tuesday_start_times << start_time
        tuesday_end_times << end_time
      elsif date.wednesday?
        wednesday_start_times << start_time
        wednesday_end_times << end_time
      elsif date.thursday?
        thursday_start_times << start_time
        thursday_end_times << end_time
      elsif date.friday?
        friday_start_times << start_time
        friday_end_times << end_time
      elsif date.saturday?
        saturday_start_times << start_time
        saturday_end_times << end_time
      elsif date.sunday?
        sunday_start_times << start_time
        sunday_end_times << end_time
      end
    end

    overall_data['Monday'] = [formatted_average_time(monday_start_times), formatted_average_time(monday_end_times)]
    overall_data['Tuesday'] = [formatted_average_time(tuesday_start_times), formatted_average_time(tuesday_end_times)]
    overall_data['Wednesday'] = [formatted_average_time(wednesday_start_times), formatted_average_time(wednesday_end_times)]
    overall_data['Thursday'] = [formatted_average_time(thursday_start_times), formatted_average_time(thursday_end_times)]
    overall_data['Friday'] = [formatted_average_time(friday_start_times), formatted_average_time(friday_end_times)]
    overall_data['Saturday'] = [formatted_average_time(saturday_start_times), formatted_average_time(saturday_end_times)]
    overall_data['Sunday'] = [formatted_average_time(sunday_start_times), formatted_average_time(sunday_end_times)]

    return [
      {
        name: 'Overall total',
        data: overall_data
      }
    ]
  end

  def formatted_average_time(times)
    return nil if times.count == 0
    date_time = DateTime.new(times.map(&:to_i).sum / times.count)
    time = DateTime.new(2000,1,1, date_time.hour, date_time.minute, date_time.second)
    return time.strftime('%Y-%m-%d %H:%M:%S')
  end
end
