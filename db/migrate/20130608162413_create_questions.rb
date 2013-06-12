class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.string :text
      t.text :answers, limit: nil
      t.text :explanation, limit: nil
      t.string :html_style, default: 'radio'
      t.integer :stage_id
      t.references :stage

      t.timestamps
    end
  end
end
