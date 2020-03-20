class DiscussResponse < ApplicationRecord
  belongs_to :response
  belongs_to :learn_user
end
