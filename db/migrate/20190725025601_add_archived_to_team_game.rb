class AddArchivedToTeamGame < ActiveRecord::Migration[5.0]
  def change
    add_column :team_games, :archived, :boolean, default: false, after: :total_score
  end
end
