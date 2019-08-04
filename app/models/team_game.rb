# == Schema Information
#
# Table name: team_games
#
#  id                  :integer          not null, primary key
#  team_id             :integer          not null
#  game_id             :integer          not null
#  total_score         :integer
#  active              :boolean          default(TRUE)
#  solitaire_player_id :integer
#  archived            :boolean          default(FALSE)
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#

class TeamGame < ApplicationRecord
  belongs_to :team
  belongs_to :game

  has_many :rounds

  scope :active, -> { where(active: true) }
  scope :inactive, -> { where(active: false) }
  scope :archived, -> { unscoped.where(archived: true) }

  default_scope { where(archived: false) }

  TEAM_GAME_COLORS = {
    0 => '#c62828', # Red
    1 => '#6a1b9a', # Purple
    2 => '#2e7d32', # Green
    3 => '#1565c0', # Blue
    4 => '#4e342e', # Brown
    5 => '#ad1457', # Pink
    6 => '#283593', # Indigo
    7 => '#00838f', # Cyan
    8 => '#ef6c00', # Orange
    9 => '#424242', # Grey
  }

  # Whether or not the referenced Team is currently active in this Game
  # @return [Boolean]
  def active?
    self.active
  end

  # Pretty string for whether this Team is active or inactive
  # @return [String]
  def active_label
    self.active? ? 'active' : 'inactive'
  end

  # Whether this team game is a singles team
  # @return [Boolean]
  def singles?
    self.team.singles?
  end

  # Whether this team game is a doubles team
  # @return [Boolean]
  def doubles?
    self.team.doubles?
  end

  # Returns the initial solitaire player for this team/game instance
  # Returns the only player on the team if team is a singles team
  # Returns nil if solitaire player is not set
  # return [Player, nil]
  def initial_solitaire_player
    if self.singles?
      return self.team.players.first
    else
      return nil if self.solitaire_player_id.nil?
      return Player.find(self.solitaire_player_id)
    end
  end

  # Archives this record (self)
  def archive!
    self.update_attribute(:archived, true)
  end
end
