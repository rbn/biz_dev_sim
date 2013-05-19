class CreateStages < ActiveRecord::Migration
  def change
    create_table :stages do |t|
      t.string :title
      t.string :content
      t.string :text

      t.timestamps
    end
  end
end
