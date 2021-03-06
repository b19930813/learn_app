class ApplicationController < ActionController::Base
    before_action :Login
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
#     include AbstractController::Translation


#     def authenticate_user_from_token!
#     auth_token = request.headers['Authorization']

#     if auth_token
#       authenticate_with_auth_token auth_token
#     else
#       authenticate_error
#     end
#   end

#   private

#   def authenticate_with_auth_token auth_token
#     unless auth_token.include?(':')
#       authenticate_error
#       return
#     end

#     learn_user_id = auth_token.split(':').first
#     learn_user = LearnUser.where(id: user_id).first

#     if learn_user && Devise.secure_compare(learn_user.access_token, auth_token)
#       # User can access
#       sign_in learn_user, store: false
#     else
#       authenticate_error
#     end
#   end

#   ##
#   # Authentication Failure
#   # Renders a 401 error
#   def authenticate_error
#     render json: { error: t('devise.failure.unauthenticated') }, status: 401
#   end

private
def Login 
  if learn_user_signed_in? 
    user = LearnUser.find(current_learn_user[:id])
    @userData = {email: user[:email], id: user[:id]}
  end
end
def record_not_found
    render plain: "查無資料", status: 404
end


end
