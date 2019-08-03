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
  has_many :team_games
  has_many :rounds
  has_many :games, -> { distinct }, :through => :team_games
  has_many :players, :through => :team_players

  SINGLES = 'singles'
  DOUBLES = 'doubles'

  VALID_TEAM_TYPES = [
    SINGLES,
    DOUBLES
  ]

  validates :team_type, inclusion: { in: VALID_TEAM_TYPES }
  validates_uniqueness_of :name, scope: :team_type

  scope :singles, -> { where(team_type: SINGLES) }
  scope :doubles, -> { where(team_type: DOUBLES) }

  # Is team type for singles
  # @return [Boolean]
  def singles?
    self.team_type == SINGLES
  end

  # Is team type for doubles
  # @return [Boolean]
  def doubles?
    self.team_type == DOUBLES
  end

  # Get the total score this team has scored so far in given game
  # @return [Integer]
  def total_score_for_game(game)
    Round.where(team: self, game: game).map(&:score).sum
  end

  # Returns pretty string representation of its players
  # @return [String]
  def team_members_label
    self.players.map(&:name).join(' + ')
  end

  # Returns pretty string representation of team name with its players
  # @return [String]
  def label_with_players
    if self.singles?
      return self.name
    else
      "#{self.name} (#{self.team_members_label})"
    end
  end
end
