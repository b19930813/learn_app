module API
    class Api::LearnUsersController < ApplicationController
        def create
            @learn_user = LearnUser.new(user_params)
            if @learn_user.save
                render json: {learn_user: @learn_user}
            else
               render json: {state:  @learn_user.errors}
            end
        end
        def show
            @learn_user = LearnUser.find(current_learn_user[:id])
            puts @learn_user
        end
        private 
        def user_params
                return {email: params[:email], password: params[:password]}
        end
    end
end