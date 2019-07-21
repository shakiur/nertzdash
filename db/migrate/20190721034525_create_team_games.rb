class CreateTeamGames < ActiveRecord::Migration[5.0]
  def change
    create_table :team_games do |t|
      t.integer :team_id, null: false
      t.integer :game_id, null: false
      t.integer :total_score

      t.timestamps
    end
  end
end
