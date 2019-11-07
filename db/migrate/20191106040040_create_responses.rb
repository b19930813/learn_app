class CreateResponses < ActiveRecord::Migration[5.2]
  def change
    create_table :responses do |t|
      t.text :content
      t.boolean :is_answer
      t.references :article
      t.references :learn_user

      t.timestamps
    end
  end
end
