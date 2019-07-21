# == Schema Information
#
# Table name: team_games
#
#  id          :integer          not null, primary key
#  team_id     :integer          not null
#  game_id     :integer          not null
#  total_score :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class TeamGame < ApplicationRecord
end
