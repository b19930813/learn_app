class CreateMyVocabularies < ActiveRecord::Migration[5.2]
  def change
    create_table :my_vocabularies do |t|
      t.references :learn_user, foreign_key: true
      t.references :vocabulary, foreign_key: true

      t.timestamps
    end
  end
end
