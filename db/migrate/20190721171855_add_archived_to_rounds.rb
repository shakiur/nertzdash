class AddArchivedToRounds < ActiveRecord::Migration[5.0]
  def change
    add_column :rounds, :archived, :boolean, default: false, after: :nertz
  end
end
