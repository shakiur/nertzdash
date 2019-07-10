class AddArchivedToGames < ActiveRecord::Migration[5.0]
  def change
    add_column :games, :archived, :boolean, after: :winning_score, default: false
  end
end
