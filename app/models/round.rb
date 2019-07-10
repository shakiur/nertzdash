# == Schema Information
#
# Table name: rounds
#
#  id           :integer          not null, primary key
#  game_id      :integer          not null
#  team_id      :integer          not null
#  round_number :integer
#  score        :integer
#  nertz        :boolean          default(FALSE), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Round < ApplicationRecord
  belongs_to :game
  belongs_to :team

  validates :round_number, uniqueness: { scope: [:game_id, :team_id] }

  def nertz?
    self.nertz
  end
end
