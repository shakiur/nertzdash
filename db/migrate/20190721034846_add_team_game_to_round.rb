class AddTeamGameToRound < ActiveRecord::Migration[5.0]
  def change
    add_column :rounds, :team_game_id, :integer, after: :team_id
  end
end
