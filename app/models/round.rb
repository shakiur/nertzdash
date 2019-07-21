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
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Round < ApplicationRecord
  belongs_to :game
  belongs_to :team
  belongs_to :team_game

  validates :round_number, uniqueness: { scope: [:game_id, :team_id] }

  # Question mark suffixed method alias for whether or not this team for this round nertzed
  # @return [Boolean]
  def nertz?
    self.nertz
  end
end
