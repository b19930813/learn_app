class CreateVocabularies < ActiveRecord::Migration[5.2]
  def change
    create_table :vocabularies do |t|
      t.integer :level
      t.string :jpVocabulary
      t.string :katakana
      t.string :cnVocabulary
      t.string :jpSentence
      t.string :cnSentence

      t.timestamps
    end
  end
end
