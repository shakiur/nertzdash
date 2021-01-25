class CardGameController < ApplicationController
  def index
  end

  def update_position
    ActionCable.server.broadcast 'card_game',
      player_pos: params[:player_pos],
      player_uuid: params[:player_uuid],
      x_pos: params[:x_pos],
      y_pos: params[:y_pos],
      time: params[:time]
    head :ok
  end
end
