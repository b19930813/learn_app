module API
    class Api::ArticlesController < ApplicationController
      
        def index
            @articles = Article.all.page(params[:page]).per(10)
        end

        def show
        end

        def create
           if learn_user_signed_in?
               #驗證身分
               user = LearnUser.find(current_learn_user[:id])
               if user.access_token == params[:access_token]
                    @articles = Article.new(learn_user_id: current_learn_user[:id], title: params[:title], content: params[:content])
                    if @articles.save
                        render json: {state:200}
                    else
                        render json: {state:400}
                    end
                else
                    render json: {state:402}
                end
           else
           render json: {state: 401}
           end
        end

        def destroy
        end

        def update
        end

    end
end