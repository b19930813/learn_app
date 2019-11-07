class ArticleSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :browseCount, :likeCount, :learnUser
end
