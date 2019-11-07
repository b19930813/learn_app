class CreateDiscusses < ActiveRecord::Migration[5.2]
  def change
    create_table :discusses do |t|
      t.text :content
      t.integer :level
      t.references :response
      t.references :learn_user

      t.timestamps
    end
  end
end
