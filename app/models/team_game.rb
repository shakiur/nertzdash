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
  def doubles?
    self.team.doubles?
  end

  # Archives this record (self)
  def archive!
    self.update_attribute(:archived, true)
  end
end
