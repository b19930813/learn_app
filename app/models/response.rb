class Response < ApplicationRecord
    belongs_to :article
    belongs_to :learn_user
    has_many :discuss
end
