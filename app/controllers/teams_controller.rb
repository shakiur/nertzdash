class TeamsController < ApplicationController
  def index
    @all_players = Player.order(:name).all
    @all_teams_sorted = Team.build_alphabetical_hash_of_teams
  end

  def create
    team_name = params[:team_name]
    team_type = params[:team_type]

    player1_id = params[:player1]
    player2_id = params[:player2]

    if team_name.blank?
      flash[:notice] = 'Team name cannot be blank'
      return redirect_to teams_path
    end

    if Team.where(name: team_name).present?
      flash[:notice] = "Team name '#{team_name}' already exists"
      return redirect_to teams_path
    end

    if team_type == Team::DOUBLES
      if player1_id.blank?
        flash[:notice] = "Player 1 must be selected"
        return redirect_to teams_path
      end

      if player2_id.blank?
        flash[:notice] = "Player 2 must be selected"
        return redirect_to teams_path
      end

      player1 = Player.find(player1_id)
      player2 = Player.find(player2_id)

      player1_teams = player1.teams
      player2_teams = player2.teams
      overlapping_team = (player1_teams & player2_teams).first

      if player1_id == player2_id
        flash[:notice] = "Player '#{player1.name}' cannot be on the same team"
        return redirect_to teams_path
      end

      if overlapping_team.present?
        flash[:notice] = "Players '#{player1.name}' and '#{player2.name}' already belong to team '#{overlapping_team.name}'"
        return redirect_to teams_path
      end
    end

    if team_type == Team::SINGLES
      if player1_id.blank?
        flash[:notice] = 'Player 1 must be selected'
        return redirect_to teams_path
      end

      player1 = Player.find(player1_id)

      if player1.teams.where(team_type: Team::SINGLES).any?
        flash[:notice] = "Player '#{player1.name}' is already on a singles team"
        return redirect_to teams_path
      end
    end

    begin
      ActiveRecord::Base.transaction do
        team = Team.new
        team.team_type = team_type
        team.name = team_name
        team.save!

        team_player1 = TeamPlayer.new
        team_player1.team_id = team.id
        team_player1.player_id = player1_id
        team_player1.save

        if team_type == Team::DOUBLES
          team_player2 = TeamPlayer.new
          team_player2.team_id = team.id
          team_player2.player_id = player2_id
          team_player2.save
        end
      end
    rescue => e
      flash[:notice] = "There was an error creating your team"
      return redirect_to teams_path
    end

    flash[:success] = "Created new Team: #{team.reload.label_with_players}"
    return redirect_to teams_path
  end
end
