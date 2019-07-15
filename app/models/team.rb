# == Schema Information
#
# Table name: teams
#
#  id         :integer          not null, primary key
#  team_type  :string(255)
#  name       :string(255)      not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Team < ApplicationRecord
  has_many :team_players
  has_many :rounds
  has_many :games, -> { distinct }, :through => :rounds
  has_many :players, :through => :team_players

  SINGLES = 'singles'
  DOUBLES = 'doubles'

  VALID_TEAM_TYPES = [
    SINGLES,
    DOUBLES
  ]

  validates :team_type, inclusion: { in: VALID_TEAM_TYPES }

  # Get the total score this team has scored so far in given game
  # @return [Integer]
  def total_score_for_game(game)
    Round.where(team: self, game: game).map(&:score).sum
  end

  # Returns pretty string representation of team name with its players
  # @return [String]
  def label_with_players
    "#{self.name} (#{self.players.map(&:name).join(' + ')})"
  end
end
