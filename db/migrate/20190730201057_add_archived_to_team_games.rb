class AddArchivedToTeamGames < ActiveRecord::Migration[5.0]
  def change
    def change
      add_column :team_games, :archived, :boolean, default: false, after: :active
    end
  end
end
