module API
    class Api::MyArticlesController < ApplicationController
        protect_from_forgery with: :null_session
        def index
            # user_check
             user = LearnUser.includes(:article).find(current_learn_user[:id])
             articleData = user.article.page(params[:page]).order("created_at DESC").per(5)
             articleCount = user.article.count
             puts articleData
             puts articleCount
             render json: {articleDatas: articleData, articleCount: articleCount}
        end

        def show
            render json: {state: "run this"}
        end
        private
        def user_check
            puts "id = #{params[:learn_user_id]}"
            if learn_user_signed_in? == false || params[:learn_user_id].to_s != current_learn_user[:id].to_s
                redirect_to '/404'
            end
          end
    end
end