# == Schema Information
#
# Table name: team_games
#
#  id          :integer          not null, primary key
#  team_id     :integer          not null
#  game_id     :integer          not null
#  total_score :integer
#  active      :boolean          default(TRUE)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'test_helper'

class TeamGameTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
