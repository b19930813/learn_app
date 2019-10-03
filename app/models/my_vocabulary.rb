class MyVocabulary < ApplicationRecord
  belongs_to :learn_user
  belongs_to :vocabulary
end
