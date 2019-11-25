module API
    class Api::SessionSerializer < ActiveModel::Serializer
      protect_from_forgery with: :null_session
      attributes :email, :token_type, :user_id, :access_token
  
      def user_id
        object.id
      end
  
      def token_type
        'Bearer'
      end
  
    end
  end