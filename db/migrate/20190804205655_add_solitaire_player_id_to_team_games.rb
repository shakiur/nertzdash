class AddSolitairePlayerIdToTeamGames < ActiveRecord::Migration[5.0]
  def change
    add_column :team_games, :solitaire_player_id, :integer, after: :active
  end
end
