class PlayersController < ApplicationController
  def index
    @all_players = Player.order(:name).all
  end

  def create
    player_name = params[:player_name]

    new_player = Player.new
    new_player.name = player_name
    new_player.save

    flash[:success] = "Created new Player: #{new_player.name}"
    return redirect_to players_path
  end
end
