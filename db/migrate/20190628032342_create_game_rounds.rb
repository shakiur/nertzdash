class CreateGameRounds < ActiveRecord::Migration[5.0]
  def change
    create_table :game_rounds do |t|
      t.integer :game_id
      t.integer :team_id
      t.integer :round_number
      t.integer :score
      t.boolean :nertz, default: false
      t.timestamps
    end
  end
end
