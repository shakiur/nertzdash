Rails.application.routes.draw do
  root :to => redirect('/games')

  get '/games' => 'games#index', as: :games
  put '/games/create' => 'games#create', as: :create_game
  get '/games/scores/:game_id' => 'games#scores', as: :game_scores

  get '/teams' => 'teams#index', as: :teams
  post '/teams/create' => 'teams#create', as: :create_team

  get '/players' => 'players#index', as: :players
  post '/players/create' => 'players#create', as: :create_player
end
