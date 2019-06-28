# == Schema Information
#
# Table name: teams
#
#  id         :integer          not null, primary key
#  player1_id :integer
#  player2_id :integer
#  team_name  :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Team < ApplicationRecord
end
