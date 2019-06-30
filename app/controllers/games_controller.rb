class GamesController < ApplicationController
  def index
  end

  def create
    game = Game.new
    # game.date =
    flash[:success] = "hello world"
    return redirect_to games_path
  end

  def scores
    @hello = "world"
  end
end
