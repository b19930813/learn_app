class LearnArticleSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :is_avilable, :author, :level, :popular
end
