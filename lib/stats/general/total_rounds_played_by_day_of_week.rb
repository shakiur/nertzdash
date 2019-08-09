module TotalRoundsPlayedByDayOfWeek
  module_function

  def stat_type
    StatsController::GENERAL
  end

  def description
    "Total number of rounds played per day of the week for singles, doubles, and in total."
  end

  def graph_type
    :column_chart
  end

  def graph_options
    {
      xtitle: 'Day of the week',
      ytitle: 'Total rounds played',
      discrete: true
    }
  end

  def data
    overall_data = {}
    singles_data = {}
    doubles_data = {}

    monday_rounds = []
    tuesday_rounds = []
    wednesday_rounds = []
    thursday_rounds = []
    friday_rounds = []
    saturday_rounds = []
    sunday_rounds = []

    rounds = Round.joins(:game, :team).select('games.date, teams.team_type')

    rounds.each do |round|
      date = round.date
      if date.monday?
        monday_rounds << round
      elsif date.tuesday?
        tuesday_rounds << round
      elsif date.wednesday?
        wednesday_rounds << round
      elsif date.thursday?
        thursday_rounds << round
      elsif date.friday?
        friday_rounds << round
      elsif date.saturday?
        saturday_rounds << round
      elsif date.sunday?
        sunday_rounds << round
      end
    end

    overall_data['Monday'] = monday_rounds.size
    singles_data['Monday'] = monday_rounds.count { |round| round.team_type == Team::SINGLES }
    doubles_data['Monday'] = monday_rounds.count { |round| round.team_type == Team::DOUBLES }

    overall_data['Tuesday'] = tuesday_rounds.size
    singles_data['Tuesday'] = tuesday_rounds.count { |round| round.team_type == Team::SINGLES }
    doubles_data['Tuesday'] = tuesday_rounds.count { |round| round.team_type == Team::DOUBLES }

    overall_data['Wednesday'] = wednesday_rounds.size
    singles_data['Wednesday'] = wednesday_rounds.count { |round| round.team_type == Team::SINGLES }
    doubles_data['Wednesday'] = wednesday_rounds.count { |round| round.team_type == Team::DOUBLES }

    overall_data['Thursday'] = thursday_rounds.size
    singles_data['Thursday'] = thursday_rounds.count { |round| round.team_type == Team::SINGLES }
    doubles_data['Thursday'] = thursday_rounds.count { |round| round.team_type == Team::DOUBLES }

    overall_data['Friday'] = friday_rounds.size
    singles_data['Friday'] = friday_rounds.count { |round| round.team_type == Team::SINGLES }
    doubles_data['Friday'] = friday_rounds.count { |round| round.team_type == Team::DOUBLES }

    overall_data['Saturday'] = saturday_rounds.size
    singles_data['Saturday'] = saturday_rounds.count { |round| round.team_type == Team::SINGLES }
    doubles_data['Saturday'] = saturday_rounds.count { |round| round.team_type == Team::DOUBLES }

    overall_data['Sunday'] = sunday_rounds.size
    singles_data['Sunday'] = sunday_rounds.count { |round| round.team_type == Team::SINGLES }
    doubles_data['Sunday'] = sunday_rounds.count { |round| round.team_type == Team::DOUBLES }

    return [
      {
        name: 'Overall total',
        data: overall_data
      },
      {
        name: 'Singles total',
        data: singles_data
      },
      {
        name: 'Doubles total',
        data: doubles_data
      }
    ]
  end
end
