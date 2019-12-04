module API
    class Api::MyArticlesController < ApplicationController
        protect_from_forgery with: :null_session
        def index
            #user_check
            articleDatas = Article.where("learn_user_id = #{current_learn_user[:id]}").page(params[:page]).order("created_at DESC").per(5)
            articleCount = Article.where("learn_user_id = #{current_learn_user[:id]}").count
            render json: {articleDatas: articleDatas, articleCount: articleCount}
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