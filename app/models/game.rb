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
end
