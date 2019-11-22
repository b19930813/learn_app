class CreateLearnArticles < ActiveRecord::Migration[5.2]
  def change
    create_table :learn_articles do |t|
      t.string :title
      t.text :content
      t.boolean :is_avilable
      t.string :author
      t.integer :level
      t.integer :popular

      t.timestamps
    end
  end
end
