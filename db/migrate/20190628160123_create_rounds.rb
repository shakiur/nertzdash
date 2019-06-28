class CreateRounds < ActiveRecord::Migration[5.0]
  def change
    create_table :rounds do |t|
      t.integer :game_id, null: false
      t.integer :team_id, null: false
      t.integer :round_number
      t.integer :score
      t.boolean :nertz, default: false, null: false
      t.timestamps
    end
  end
end
