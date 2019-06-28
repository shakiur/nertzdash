class CreateTeams < ActiveRecord::Migration[5.0]
  def change
    create_table :teams do |t|
      t.integer :player1_id
      t.integer :player2_id
      t.string :team_name
      t.timestamps
    end
  end
end
