# == Schema Information
#
# Table name: games
#
#  id            :integer          not null, primary key
#  date          :date
#  winning_score :integer
#  archived      :boolean          default(FALSE)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Game < ApplicationRecord
  has_many :rounds
  has_many :team_games
  has_many :teams, -> { distinct }, :through => :team_games
 
  default_scope { where(archived: false) }

  # The most recently logged round number for this game
  # @return [Integer]
  def current_round_number
    return 1 unless self.rounds.any?
    return self.rounds.pluck(:round_number).max
  end

  # The next round number for this game
  # @return [Integer]
  def next_round_number
    self.current_round_number + 1
  end

  # The team that is winning this game instance
  # @return [Team]
  def winning_team
    self.teams.sort_by { |team| team.total_score_for_game(self) }.last
  end

  # The winning score of this game instance
  # @return [Integer]
  def winning_score
    return 0 unless winning_team
    winning_team.total_score_for_game(self)
  end

  # Comma separated string of team names participating in this game
  # @return [String]
  def team_names
    self.teams.map(&:name).join(', ')
  end
end
