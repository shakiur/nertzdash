class TeamsController < ApplicationController
  def index
    @players = Player.all
  end

  def create
    team_name = params[:team_name]
    player1_id = params[:player1]
    player2_id = params[:player2]

    team = Team.new
    team.name = team_name
    team.save

    team_player1 = TeamPlayer.new
    team_player1.team_id = team.id
    team_player1.player_id = player1_id
    team_player1.save

    team_player2 = TeamPlayer.new
    team_player2.team_id = team.id
    team_player2.player_id = player2_id
    team_player2.save

    redirect_to teams_path
  end
end
