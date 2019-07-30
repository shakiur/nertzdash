module AverageScoreSingles
  module_function

  def team_type
    Team::SINGLES
  end

  def description
    "Average score of singles players per round. Only accounts for players who have played at minimum of 10 rounds across 2 or more games."
  end

  def graph_type
    :column_chart
  end

  def graph_options
    {
      xtitle: 'Player',
      ytitle: 'Average score'
    }
  end

  def data
    data = {}
    Team.singles.each do |team|
      next unless team.rounds.count >= 10
      next unless team.team_games.count >= 2

      scores = team.rounds.pluck(:score)
      num_scores = scores.count
      total_score = scores.sum
      data[team.name] = (total_score.to_f / num_scores).round.to_i
    end
    return data.sort_by { |name, score| score }.reverse
  end
end
