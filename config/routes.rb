Rails.application.routes.draw do
  get '/games' => 'games#index', as: :games
  post '/games/create' => 'games#create', as: :create_game

  get '/teams' => 'teams#index', as: :teams
  post '/teams/create' => 'teams#create', as: :create_team
end
