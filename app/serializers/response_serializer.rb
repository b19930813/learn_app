class ResponseSerializer < ActiveModel::Serializer
  attributes :id, :content, :is_answer, :article, :learn_user
end
