class GamesController < ApplicationController
  def index
    @games = Game.all
  end

  def create
    game_date = params[:game][:date]
    winning_score = params[:game][:winning_score]

    game = Game.new
    game.date = game_date.to_date
    game.winning_score = winning_score.blank? ? nil : winning_score
    game.save!

    flash[:success] = "Created new Game #{game.id}"
    return redirect_to game_scores_path(game_id: game.id)
  end

  def scores
    @game = Game.find(params[:game_id])
    @team_games = @game.team_games.sort_by(&:id)
    @winning_team_game = @game.winning_team_game
    @rounds_by_number = @game.rounds.group_by(&:round_number)
  end

  def add_team
    @game = Game.find(params[:game_id])
    new_team = Team.find(params[:team_id])

    # Graceful notice if this Team has already been added to this Game
    if TeamGame.where(game_id: @game.id, team_id: new_team.id).any?
      flash[:notice] = "#{new_team.name} already added to this game"
      return redirect_to game_scores_path(game_id: params[:game_id])
    end

    team_game = TeamGame.new
    team_game.game_id = @game.id
    team_game.team_id = new_team.id
    team_game.total_score = 0
    team_game.save!

    flash[:success] = "Added new team: #{new_team.name}"
    return redirect_to game_scores_path(game_id: params[:game_id])
  end

  def save_round
    # Save the scores and nerzted team for this round number
    round_number = params[:round_number].to_i
    nertzed_field_name = "nertzed-#{round_number}"
    nertzed_round_id = params[nertzed_field_name]
    scores_by_round_id = params[:scores]

    ActiveRecord::Base.transaction do
      scores_by_round_id.each do |round_id, score|
        round = Round.find(round_id.to_i)
        round.score = score.to_i
        round.nertz = round_id == nertzed_round_id
        round.save!

        team_game = round.team_game
        team_game.total_score = team_game.rounds.sum(&:score)
        team_game.save!
      end
    end

    flash[:success] = "Saved round #{params[:round_number]}"
    redirect_to game_scores_path(game_id: params[:game_id])
  end

  def new_round
    game = Game.find(params[:game_id])
    next_round_number = game.next_round_number

    ActiveRecord::Base.transaction do
      game.team_games.each do |team_game|
        previous_round_number = next_round_number - 1

        team_game_rounds = Round.where(
          game_id: game.id,
          team_game_id: team_game.id)

        team_game_missing_from_previous_round = team_game_rounds.select { |round| round.round_number == previous_round_number }.empty?
        team_game_was_previously_playing = team_game_rounds.any?

        next if team_game_missing_from_previous_round && team_game_was_previously_playing

        new_round = Round.new
        new_round.game_id = game.id
        new_round.team_id = team_game.team.id
        new_round.team_game_id = team_game.id
        new_round.round_number = next_round_number
        new_round.score = 0
        new_round.save!
      end
    end

    flash[:success] = "Created new round #{next_round_number}"
    redirect_to game_scores_path(game_id: game.id)
  end

  def toggle_team_game_active
    team_game = TeamGame.find(params[:team_game_id])
    team_game.active = !team_game.active?
    team_game.save!

    flash_msg = "Team #{team_game.team.name} is now #{team_game.active_label}!"
    flash[:notice] =  "#{flash_msg} Future rounds will #{'not' unless team_game.active?} be created for them."
    return redirect_to game_scores_path(game_id: team_game.game_id)
  end

  def archive_game
    game = Game.find(params[:game_id])
    game.archived = true
    game.save!

    flash[:notice] = "Archived Game #{game.id}"
    redirect_to games_path
  end

  def archive_round
    team_game_id = params[:team_game_id]
    round_number = params[:round_number]
    game_id = params[:game_id]

    ActiveRecord::Base.transaction do
      round = Round.where(game_id: game_id, team_game_id: team_game_id, round_number: round_number).take
      round.archived = true
      round.save!

      team_game = TeamGame.find(team_game_id)
      team_game.total_score = team_game.rounds.sum(&:score)
      team_game.save!
    end

    redirect_to game_scores_path(game_id: game_id)
  end
end
