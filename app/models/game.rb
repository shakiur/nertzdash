# == Schema Information
#
# Table name: games
#
#  id            :integer          not null, primary key
#  date          :date
#  winning_score :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Game < ApplicationRecord
  has_many :rounds
  has_many :teams, :through => :rounds

  # The team that is winning this game instance
  # @return [Team]
  def winning_team
    # TODO
    return 'Sham'
  end

  # The winning score of this game instance
  # @return [Integer]
  def winning_score
    # TODO
    return 100
  end
end
