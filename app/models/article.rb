class Article < ApplicationRecord
    #文章會有很多回應，討論，每個文章都屬於一個使用者
    has_many :response
    has_many :discuss_article
    belongs_to :learn_user
end
