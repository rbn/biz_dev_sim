class CreateFlares < ActiveRecord::Migration
  def change
    create_table :flares do |t|
      t.string :name

      t.timestamps
    end
  end
end
