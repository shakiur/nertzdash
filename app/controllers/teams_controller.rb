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

    player1_teams = player1.teams
    player2_teams = player2.teams
    overlapping_team = (player1_teams & player2_teams).first

    if team_name.blank?
      flash[:notice] = 'Team name cannot be blank'
      return redirect_to teams_path
    end

    if Team.where(name: team_name).present?
      flash[:notice] = "Team name '#{team_name}' already exists"
      return redirect_to teams_path
    end

    if player1_id == player2_id
      flash[:notice] = "Player '#{player1.name}' cannot be on the same team twice"
      return redirect_to teams_path
    end

    if overlapping_team.present?
      flash[:notice] = "Players '#{player1.name}' and '#{player2.name}' already belong to team '#{overlapping_team.name}'"
      return redirect_to teams_path
    end

    begin
      ActiveRecord::Base.transaction do
        team = Team.new
        team.name = team_name
        team.save!

        team_player1 = TeamPlayer.new
        team_player1.team_id = team.id
        team_player1.player_id = player1_id
        team_player1.save

        team_player2 = TeamPlayer.new
        team_player2.team_id = team.id
        team_player2.player_id = player2_id
        team_player2.save
      end
    rescue => e
      byebug
    end

    return redirect_to teams_path
  end
end
