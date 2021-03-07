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

  def broadcast_player_active_status
    ActionCable.server.broadcast 'card_game',
      data_type: params[:data_type],
      player_pos: params[:player_pos],
      player_uuid: params[:player_uuid],
      player_active: params[:player_active],
      player_name: params[:player_name],
      time: params[:time]
    head :ok
  end

  def broadcast_player_score
    ActionCable.server.broadcast 'card_game',
      data_type: params[:data_type],
      player_pos: params[:player_pos],
      player_uuid: params[:player_uuid],
      player_score: params[:player_score],
      time: params[:time]
    head :ok
  end

  def broadcast_player_solitaire
    ActionCable.server.broadcast 'card_game',
      data_type: params[:data_type],
      player_pos: params[:player_pos],
      player_uuid: params[:player_uuid],
      solitaire_deck: params[:solitaire_deck],
      solitaire_pile: params[:solitaire_pile],
      leftover_solitaire_pile: params[:leftover_solitaire_pile],
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

  def broadcast_player_nertz_pile_x_y_pos
    ActionCable.server.broadcast 'card_game',
      data_type: params[:data_type],
      player_pos: params[:player_pos],
      player_uuid: params[:player_uuid],
      nertz_pile_x_pos: params[:nertz_pile_x_pos],
      nertz_pile_y_pos: params[:nertz_pile_y_pos],
      time: params[:time]
    head :ok
  end

  def broadcast_player_preview_work_pile_x_y_pos
    ActionCable.server.broadcast 'card_game',
      data_type: params[:data_type],
      player_pos: params[:player_pos],
      player_uuid: params[:player_uuid],
      work_pile_pos: params[:work_pile_pos],
      preview_index: params[:preview_index],
      preview_work_pile_y_pos: params[:preview_work_pile_y_pos],
      preview_work_pile_x_pos: params[:preview_work_pile_x_pos],
      work_pile_x_pos: params[:work_pile_x_pos],
      work_pile_y_pos: params[:work_pile_y_pos],
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

  def broadcast_center_table_pile
    ActionCable.server.broadcast 'card_game',
      data_type: params[:data_type],
      player_pos: params[:player_pos],
      player_uuid: params[:player_uuid],
      center_pile_num: params[:center_pile_num],
      center_pile: params[:center_pile],
      time: params[:time]
    head :ok
  end

  def broadcast_player_solitaire_work_pile
    ActionCable.server.broadcast 'card_game',
      data_type: params[:data_type],
      player_pos: params[:player_pos],
      player_uuid: params[:player_uuid],
      work_pile_pos: params[:work_pile_pos],
      solitaire_work_pile: params[:solitaire_work_pile],
      time: params[:time]
    head :ok
  end

  def all_players
    all_players_hash = Player.all.map{ |player| {:id => player.id, :name => player.name} }
    render json: all_players_hash
  end

  def send_new_active_viewer_join
    ActionCable.server.broadcast 'card_game',
      data_type: 'new_active_viewer',
      player_uuid: params[:player_uuid]
    head :ok
  end

  def broadcast_reset_player_game_data
    ActionCable.server.broadcast 'card_game',
      data_type: params[:data_type],
      player_uuid: params[:player_uuid]
    head :ok
  end

  def broadcast_player_all_data
    ActionCable.server.broadcast 'card_game',
      data_type: params[:data_type],
      player_pos: params[:player_pos],
      player_uuid: params[:player_uuid],
      player_active: params[:player_active],
      player_name: params[:player_name],
      player_score: params[:player_score],
      nertz_pile: params[:nertz_pile],
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
end
