json.extract! response, :id, :content, :is_answer, :article, :learn_user, :created_at, :updated_at
json.url response_url(response, format: :json)
