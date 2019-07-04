class TeamsController < ApplicationController
  def index
    @all_players = Player.all
    @all_teams = Team.includes(team_players: :player).all 
  end

  def create
    team_name = params[:team_name]
    player1_id = params[:player1]
    player2_id = params[:player2]

    player1 = Player.find(player1_id)
    player2 = Player.find(player2_id)

    if player1_id == player2_id
      flash[:notice] = 'Cannot pick the same players within a team'
      return redirect_to teams_path
    end

    # Checks if both members already exist on a team
    player1_teams = player1.teams
    player2_teams = player2.teams
    overlapping_team = (player1_teams & player1_teams).first
    
    if overlapping_team.present?
      flash[:notice] = "Players #{player1.name} and #{player2.name} already belong to team #{overlapping_team.name}"
      return redirect_to teams_path
    end

    ActiveRecord::Base.transaction do
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
    end

    return redirect_to teams_path
  end
end
