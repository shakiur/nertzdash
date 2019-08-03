class PlayersController < ApplicationController
  def index
    @all_players = Player.order(:name).all
  end

  def create
    player_name = params[:player_name]

    new_player = Player.new
    new_player.name = player_name
    new_player.save

    new_team = Team.new
    new_team.team_type = Team::SINGLES
    new_team.name = player_name
    new_team.save

    team_player = TeamPlayer.new
    team_player.team_id = new_team.id
    team_player.player_id = new_player.id
    team_player.save

    flash[:success] = "Created new Player: #{new_player.name}. Created new single player Team."
    return redirect_to players_path
  end

  def change
    new_player_param = "new_player_name_#{params[:player_id]}"

    @player = Player.find(params[:player_id])
    @player.name = params[new_player_param]
    @player.save!

    flash[:success] = "Successfully change player name to: #{@player.name}"
    return redirect_to players_path
  end
end
