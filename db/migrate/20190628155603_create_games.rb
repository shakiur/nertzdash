class CreateGames < ActiveRecord::Migration[5.0]
  def change
    create_table :games do |t|
      t.date :date
      t.integer :winning_score
      t.timestamps
    end
  end
end
