# == Schema Information
#
# Table name: game_rounds
#
#  id           :integer          not null, primary key
#  game_id      :integer
#  team_id      :integer
#  round_number :integer
#  score        :integer
#  nertz        :boolean          default(FALSE)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

require 'test_helper'

class GameRoundTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
