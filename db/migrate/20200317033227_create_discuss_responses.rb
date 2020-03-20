class CreateDiscussResponses < ActiveRecord::Migration[6.0]
  def change
    create_table :discuss_responses do |t|
      t.text :content
      t.references :response, null: false, foreign_key: true
      t.references :learn_user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
