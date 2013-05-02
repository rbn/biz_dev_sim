class CreatePieces < ActiveRecord::Migration
  def change
    create_table :pieces do |t|
      t.string :title
      t.string :caption
      t.integer :next_id
      t.references :game

      t.timestamps
    end

  end
end
