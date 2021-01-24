class CardGameController < ApplicationController
  def index
  end

  def update_position
    ActionCable.server.broadcast 'card_game',
      player_pos: params[:player_pos],
      x_pos: params[:x_pos],
      y_pos: params[:y_pos]
    head :ok
  end
end
