# == Schema Information
#
# Table name: rounds
#
#  id           :integer          not null, primary key
#  game_id      :integer          not null
#  team_id      :integer          not null
#  team_game_id :integer
#  round_number :integer
#  score        :integer
#  nertz        :boolean          default(FALSE), not null
#  archived     :boolean          default(FALSE)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Round < ApplicationRecord
  belongs_to :game
  belongs_to :team
  belongs_to :team_game

  scope :archived, -> { unscoped.where(archived: true) }

  default_scope { where(archived: false) }

  validate :unique_unarchived_round_number_and_team_game_id

  # Question mark suffixed method alias for whether or not this team for this round nertzed
  # @return [Boolean]
  def nertz?
    self.nertz
  end

  # Archives this record (self)
  def archive!
    self.update_attribute(:archived, true)
  end

  def unique_unarchived_round_number_and_team_game_id
    if Round.where(
        team_game_id: self.team_game_id,
        round_number: self.round_number
      ).count > 1
      self.errors.add(:round_number, "must be unique per team per game")
    end
  end
end
