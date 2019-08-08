module AverageScorePerRoundOverNumberOfParticipants
  module_function

  def stat_type
    StatsController::GENERAL
  end

  def description
    "Average score per round based on the number of teams/players participating in a game."
  end

  def graph_type
    :area_chart
  end

  def graph_options
    {
      xtitle: 'Number of participants',
      ytitle: 'Average score per round',
      discrete: true
    }
  end

  def data
    avg_scores = Hash.new { |h, k| h[k] = [] }

    Round.select(
      :game_id,
      :round_number,
      :score
    ).group_by { |round|
      [round.game_id, round.round_number]
    }.each do |game_and_round_number, rounds|
      num_participants = rounds.size
      average_score_for_this_game_and_round = rounds.pluck(:score).sum.to_f / num_participants
      avg_scores[num_participants] << average_score_for_this_game_and_round.round(2)
    end

    data = {}
    avg_scores.each do |num_participants, average_scores|
      avg_score_for_this_num_participants = average_scores.sum.to_f / average_scores.size
      data[num_participants] = avg_score_for_this_num_participants.round(1)
    end

    return data.sort_by { |num_participants, avg_score| avg_score }.reverse
  end
end
