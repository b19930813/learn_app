module API
    class Api::LearnUsersController < ApplicationController
        def create
            puts 'run this'
            @learn_user = LearnUser.new user_params
            puts @learn_user
            render json: {learn_user: @learn_user}
            # if @learn_user.save!
            #   render json: {learn_user: @learn_user}
            # else
            #     render plain: 'false'  
            # end
        end

        private 
        def user_params
            params.require(:learn_user).permit(:email, :password)
        end
    end
end