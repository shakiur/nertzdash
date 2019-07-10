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

  def total_score_for_game(game)
    Round.where(team: self, game: game).map(&:score).sum
  end
end
