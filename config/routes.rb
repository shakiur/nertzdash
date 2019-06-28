Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/teams' => 'teams#index', as: :teams
  post '/teams/create' => 'teams#create', as: :create_team
end
