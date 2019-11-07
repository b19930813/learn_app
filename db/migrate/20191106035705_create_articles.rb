class CreateArticles < ActiveRecord::Migration[5.2]
  def change
    create_table :articles do |t|
      t.string :title
      t.text :content
      t.integer :browseCount
      t.integer :likeCount
      t.references :learn_user

      t.timestamps
    end
  end
end
