# == Schema Information
#
# Table name: team_games
#
#  id          :integer          not null, primary key
#  team_id     :integer          not null
#  game_id     :integer          not null
#  total_score :integer
#  active      :boolean          default(TRUE)
#  archived    :boolean          default(FALSE)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class TeamGame < ApplicationRecord
  belongs_to :team
  belongs_to :game

  has_many :rounds

  scope :active, -> { where(active: true) }
  scope :inactive, -> { where(active: false) }

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
end
