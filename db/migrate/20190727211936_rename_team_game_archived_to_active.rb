class RenameTeamGameArchivedToActive < ActiveRecord::Migration[5.0]
  def change
    rename_column :team_games, :archived, :active
    change_column :team_games, :active, :boolean, :default => true
  end
end
