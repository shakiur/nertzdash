class GamesController < ApplicationController
  def index
    @hello = "world"
  end

  def create
    return redirect_to games_path
  end
end
