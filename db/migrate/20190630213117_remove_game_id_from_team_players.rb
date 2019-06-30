class RemoveGameIdFromTeamPlayers < ActiveRecord::Migration[5.0]
  def change
    remove_column :team_players, :game_id
  end
end
