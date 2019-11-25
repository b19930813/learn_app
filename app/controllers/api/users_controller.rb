module API
    class Api::UsersController < ApplicationController
        protect_from_forgery with: :null_session
    def create
        if params['password'] == params['passwordconfirm'] 
        user_params = {email: params['email'] , password: params['password']}
        @user = User.new(user_params)
           if @user.save
            render plain: 'ok'  
           else 
            render plain: 'unknown error'     
           end
        else 
            render plain: 'password error'         
        end
    end

    def index
        @users = User.all
        render json: { users: @users }
    end

    def destroy
        puts 'run this'
    end
  end
end