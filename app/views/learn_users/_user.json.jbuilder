json.extract! learn_user, :id, :email, :password, :created_at, :updated_at
json.url user_url(learn_user, format: :json)
