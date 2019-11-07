class DiscussSerializer < ActiveModel::Serializer
  attributes :id, :content, :level, :response, :learn_user
end
