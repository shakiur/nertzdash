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
    @teams = @game.teams.sort_by(&:id)
    @winning_team = @game.winning_team
    @rounds_by_number = @game.rounds.group_by(&:round_number)
  end

  def add_team
    @game = Game.find(params[:game_id])
    new_team = Team.find(params[:team_id])

    # Graceful notice if this Team has already been added to this Game
    if Round.where(game_id: @game.id, team_id: new_team.id).any?
      flash[:notice] = "#{new_team.name} already added to this game"
      return redirect_to game_scores_path(game_id: params[:game_id])
    end

    # Adding a new team really manifests as the creation of a new Round
    # for that Team, attached to this Game
    new_round = Round.new
    new_round.game_id = @game.id
    new_round.team_id = new_team.id
    new_round.round_number = @game.current_round_number
    new_round.score = 0
    new_round.save!

    flash[:success] = "Added new team: #{new_team.name}"
    return redirect_to game_scores_path(game_id: params[:game_id])
  end

  def save_round
    # Save the scores and nerzted team for this round number
    nertzed_round_id = params[:nertzed]
    scores_by_round_id = params[:scores]

    ActiveRecord::Base.transaction do
      scores_by_round_id.each do |round_id, score|
        round = Round.find(round_id.to_i)
        round.score = score.to_i
        round.nertz = round_id == nertzed_round_id
        round.save!
      end
    end

    flash[:success] = "Saved round #{params[:round_number]}"
    redirect_to game_scores_path(game_id: params[:game_id])
  end

  def new_round
    game = Game.find(params[:game_id])
    next_round_number = game.next_round_number

    ActiveRecord::Base.transaction do
      game.teams.each do |team|
        new_round = Round.new
        new_round.game_id = game.id
        new_round.team_id = team.id
        new_round.round_number = next_round_number
        new_round.score = 0
        new_round.save!
      end
    end

    flash[:success] = "Created new round #{next_round_number}"
    redirect_to game_scores_path(game_id: game.id)
  end

  def archive_game
    game = Game.find(params[:game_id])
    game.archived = true
    game.save!

    flash[:notice] = "Archived Game #{game.id}"
    redirect_to games_path
  end
end
