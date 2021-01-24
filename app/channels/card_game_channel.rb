class CardGameChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'card_game'
  end
end
