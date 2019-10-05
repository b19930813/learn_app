module API
    class Api::LearnUsersController < ApplicationController
        def create
            puts 'run this'
            @learn_user = LearnUser.new user_params

            if @learn_user.save!
              render json: @learn_user
            else
              render json: { state: 404)
            end
        end

        private 
        def user_params
            params.require(:user).permit(:email, :password)
        end
    end
end