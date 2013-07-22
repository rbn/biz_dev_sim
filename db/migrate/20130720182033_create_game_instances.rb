class CreateGameInstances < ActiveRecord::Migration
  def change
    create_table :game_instances do |t|
      t.belongs_to :user
      t.belongs_to :game
      t.timestamps
    end
  end
end
