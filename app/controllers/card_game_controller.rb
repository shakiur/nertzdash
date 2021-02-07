class CardGameController < ApplicationController
  def index
  end

  def broadcast_player_position
    ActionCable.server.broadcast 'card_game',
      data_type: params[:data_type],
      player_pos: params[:player_pos],
      player_uuid: params[:player_uuid],
      x_pos: params[:x_pos],
      y_pos: params[:y_pos],
      time: params[:time]
    head :ok
  end

  def broadcast_player_solitaire
  end
end
