module AverageScoreDoubles
  module_function

  def graph_options
    {
      # xtitle: 'Round number',
      # ytitle: 'Total score',
      # discrete: true,
      # points: true,
      # curve: false,
      # min: min_score,
      # max: max_score
    }
  end

  def graph_type
    :bar_chart
  end

  def data
    {'a' => 1, 'b' => 3, 'c' => 6}
  end
end
