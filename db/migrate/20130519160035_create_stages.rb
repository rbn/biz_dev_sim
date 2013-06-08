class CreateStages < ActiveRecord::Migration
  def change
    create_table :stages do |t|
      t.string :title
      t.string :label
      t.string :nexts
      t.boolean :start, :default => 0
      t.integer :x
      t.integer :y
      t.integer :r
      t.string :color
      t.string :content
      t.string :page_layout
      t.string :featured_image_url
      t.text :featured_video_url, limit: nil
      t.text :featured_text, limit: nil

      t.timestamps
    end
  end
end
