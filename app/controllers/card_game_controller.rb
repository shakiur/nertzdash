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
    ActionCable.server.broadcast 'card_game',
      data_type: params[:data_type],
      player_pos: params[:player_pos],
      player_uuid: params[:player_uuid],
      player_active: params[:player_active],
      player_name: params[:player_name],
      solitaire_deck: params[:solitaire_deck],
      solitaire_pile: params[:solitaire_pile],
      leftover_solitaire_pile: params[:leftover_solitaire_pile],
      solitaire_work_1_pile: params[:solitaire_work_1_pile],
      solitaire_work_2_pile: params[:solitaire_work_2_pile],
      solitaire_work_3_pile: params[:solitaire_work_3_pile],
      solitaire_work_4_pile: params[:solitaire_work_4_pile],
      time: params[:time]
    head :ok
  end

  def broadcast_player_solitaire_x_y_pos
    ActionCable.server.broadcast 'card_game',
      data_type: params[:data_type],
      player_pos: params[:player_pos],
      player_uuid: params[:player_uuid],
      solitaire_x_pos: params[:solitaire_x_pos],
      solitaire_y_pos: params[:solitaire_y_pos],
      time: params[:time]
    head :ok
  end

  def broadcast_player_nertz_pile
    ActionCable.server.broadcast 'card_game',
      data_type: params[:data_type],
      player_pos: params[:player_pos],
      player_uuid: params[:player_uuid],
      nertz_pile: params[:nertz_pile],
      time: params[:time]
    head :ok
  end

  def broadcast_player_solitaire_work_piles
    ActionCable.server.broadcast 'card_game',
      data_type: params[:data_type],
      player_pos: params[:player_pos],
      player_uuid: params[:player_uuid],
      solitaire_work_1_pile: params[:solitaire_work_1_pile],
      solitaire_work_2_pile: params[:solitaire_work_2_pile],
      solitaire_work_3_pile: params[:solitaire_work_3_pile],
      solitaire_work_4_pile: params[:solitaire_work_4_pile],
      time: params[:time]
    head :ok
  end

  def all_players
    all_players_hash = Player.all.map{ |player| {:id => player.id, :name => player.name} }
    render json: all_players_hash
  end
end
