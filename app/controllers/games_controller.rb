class GamesController < ApplicationController
  def index
  end

  def create
    game_date = params[:game][:date]
    winning_score = params[:game][:winning_score]

    game = Game.new
    game.date = game_date.to_date
    game.winning_score = winning_score.blank? ? nil : winning_score
    game.save!

    flash[:success] = "Successfully created Game #{game.id}"
    return redirect_to game_scores_path(game_id: game.id)
  end

  def scores
    @game = Game.find(params[:game_id])

  end

  def add_team
    @game = Game.find(params[:game_id])
    new_team = Team.find(params[:team_id])

    # Adding a new team really manifests as the creation of a new Round
    # for that Team, attached to this Game
    

    flash[:success] = "Added new team: #{new_team.name}"
    return redirect_to game_scores_path(game_id: params[:game_id])
  end
end
