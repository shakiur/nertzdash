Rails.application.routes.draw do
  root :to => redirect('/games')

  get '/games' => 'games#index', as: :games
  put '/games/create' => 'games#create', as: :create_game
  post '/games/:game_id/archive' => 'games#archive_game', as: :archive_game

  get '/games/scores/:game_id' => 'games#scores', as: :game_scores
  put '/games/scores/:game_id/add_team' => 'games#add_team', as: :add_team_to_game
  post '/games/scores/:game_id/save_round' => 'games#save_round', as: :save_round
  post '/games/scores/:game_id/new_round' => 'games#new_round', as: :new_round
  post '/games/scores/:game_id/toggle_team/:team_game_id' => 'games#toggle_team_game_active', as: :toggle_team_game_active
  post '/games/scores/:game_id/archive_team_game/:team_game_id' => 'games#archive_team_game', as: :archive_team_game
  post '/games/scores/:game_id/archive_round/:round_number' => 'games#archive_round', as: :archive_round
  post '/games/scores/:game_id/set_solitaire_players' => 'games#set_solitaire_players', as: :set_solitaire_players

  get '/teams' => 'teams#index', as: :teams
  get '/teams/:team_id' => 'teams#past_games', as: :past_games
  post '/teams/create' => 'teams#create', as: :create_team
  post '/teams/:team_id/change' => 'teams#change', as: :change_team

  get '/players' => 'players#index', as: :players
  post '/players/create' => 'players#create', as: :create_player
  post '/players/:player_id/change' => 'players#change', as: :change_player

  get '/stats/:stat_type' => 'stats#index', as: :stats

  get '/experimental' => 'experimental#index', as: :experimental

  get '/card_game' => 'card_game#index', as: :card_game
  get '/card_game/all_players' => 'card_game#all_players', as: :card_game_all_players
  get '/card_game/broadcast_player_position' => 'card_game#broadcast_player_position', as: :card_game_broadcast_player_position
  get '/card_game/broadcast_player_solitaire' => 'card_game#broadcast_player_solitaire', as: :card_game_broadcast_player_solitaire
  get '/card_game/broadcast_player_solitaire_x_y_pos' => 'card_game#broadcast_player_solitaire_x_y_pos', as: :card_game_broadcast_player_solitaire_x_y_pos

  namespace :api do
    namespace :v1 do
      resources :players
    end
  end

  mount ActionCable.server => '/cable'
end
