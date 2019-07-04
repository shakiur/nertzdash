# == Schema Information
#
# Table name: players
#
#  id         :integer          not null, primary key
#  name       :string(255)      not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Player < ApplicationRecord
  has_many :team_players
  has_many :teams, :through => :team_players
end
