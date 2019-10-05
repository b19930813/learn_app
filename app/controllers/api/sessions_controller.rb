module API
    class Api::SessionsController < ApplicationController
      
       # acts_as_token_authentication_handler_for LearnUser,fallback_to_devise: false
        #login
        def create
             @learnuser =  LearnUser.find_for_database_authentication(email: params[:email])
             return invalid_email unless @learnuser
             if @learnuser.valid_password?(params[:password])
                sign_in :learn_user, @learnuser
                puts "登入了? = #{learn_user_signed_in?}"
                render json: @learnuser, serializer: SessionSerializer, root: nil
              
              else
                invalid_password
              end
            #render json: {state: 200}
        end
        #logout
        def destroy
            puts "有登入嗎 : #{learn_user_signed_in?}"
            sign_out(current_learn_user)
            # puts "destroy : #{learn_user_signed_in?}"
        end
        def index
            render json: {login: learn_user_signed_in?}
        end
   
        def show
          render json: {login: learn_user_signed_in?}
        end

        private

        def invalid_email
          warden.custom_failure!
          render json: { error: t('invalid_email') }
        end
    
        def invalid_password
          warden.custom_failure!
          render json: { error: t('invalid_password') }
        end
    end
end