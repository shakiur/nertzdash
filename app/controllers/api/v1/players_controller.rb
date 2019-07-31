class Api::V1::PlayersController < ApplicationController
  def index
    render json: Player.all
  end
end
