class Answer < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.text :text, limit: nil
      t.boolean :value, default: false
      t.integer :question_id
      t.references :question

      t.timestamps
    end
  end
end
