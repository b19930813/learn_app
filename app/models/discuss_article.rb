class DiscussArticle < ApplicationRecord
  belongs_to :article
  belongs_to :learn_user
end
