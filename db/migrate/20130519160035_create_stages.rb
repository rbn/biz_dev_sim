class CreateStages < ActiveRecord::Migration
  def change
    create_table :stages do |t|
      t.string :title
      t.string :label
      t.string :next
      t.boolean :start, :default => 0
      t.integer :x
      t.integer :y
      t.integer :r
      t.string :color
      t.string :content

      t.timestamps
    end
  end
end
