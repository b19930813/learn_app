class Article < ApplicationRecord
    has_many :response
    has_many :discuss
    belongs_to :learn_user
end
