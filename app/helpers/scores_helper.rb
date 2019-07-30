module ScoresHelper
  # Red to white to green color gradient based on negative to positive score
  # @return [Integer]
  def score_heatmap(score:)
    if score <= -21
      return '#E47D75'
    elsif score.in?(-20..-15)
      return '#E99691'
    elsif score.in?(-14..-10)
      return '#EFB0AC'
    elsif score.in?(-9..-5)
      return '#F4CAC8'
    elsif score.in?(-4..-1)
      return '#F9E4E3'
    elsif score == 0
      return '#FFFFFF'
    elsif score.in?(1..10)
      return '#DFF2E8'
    elsif score.in?(11..15)
      return '#BDE4D1'
    elsif score.in?(16..20)
      return '#9DD6BA'
    elsif score.in?(21..25)
      return '#7CC8A3'
    elsif score >= 26
      return '#5BBA8B'
    end
  end
end
