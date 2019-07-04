class AddTeamTypeToTeams < ActiveRecord::Migration[5.0]
  def change
    add_column :teams, :team_type, :string, after: :id   
  end
end
