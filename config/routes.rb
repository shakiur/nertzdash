Rails.application.routes.draw do
  get '/games' => 'games#index', as: :games

  get '/teams' => 'teams#index', as: :teams
  post '/teams/create' => 'teams#create', as: :create_team
end
