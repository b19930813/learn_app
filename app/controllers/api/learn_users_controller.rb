module API
    class Api::LearnUsersController < ApplicationController
        protect_from_forgery with: :null_session
        def index
            if learn_user_signed_in?
            @learn_user = LearnUser.find(current_learn_user[:id])
            render json: {learn_user: @learn_user}
            else
                render json: {state: 'error'}
            end
        end

        def create
            @learn_user = LearnUser.new(user_params)
            if @learn_user.save
                render json: {learn_user: @learn_user}
            else
               render json: {state:  @learn_user.errors}
            end
        end

        def update
            puts "run update!"
            @learn_user = LearnUser.find(current_learn_user[:id])
            #驗證token
                if @learn_user.update(update_user_params)
                    render json: {learn_user: @learn_user}
                else
                    render json: {state: @learn_user.errors}
                end
        end

        def show
            @learn_user = LearnUser.find(current_learn_user[:id])
        end

        private 
        def user_params
            return {email: params[:email], password: params[:password]}
        end
        def update_user_params
            return {password: params[:password]}
        end
         
    end
end