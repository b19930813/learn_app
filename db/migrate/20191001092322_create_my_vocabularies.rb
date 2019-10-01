class CreateMyVocabularies < ActiveRecord::Migration[5.2]
  def change
    create_table :my_vocabularies do |t|
      t.integer :level
      t.string :jpVocabulary
      t.string :katakana
      t.string :cnVocabulary
      t.string :jpSentence
      t.string :cnSentence
      t.string :pos
      t.integer :learn_user_id

      t.timestamps
    end
  end
end
