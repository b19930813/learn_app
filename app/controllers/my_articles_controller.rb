class MyArticlesController < ApplicationController
    before_action :set_article, only: [:show, :edit, :update, :destroy]
  
    def index
      user_check
      @articleDatas =  Article.where("learn_user_id = #{params[:learn_user_id]}")
     # @userDatas = @articleDatas.map(&:learn_user)
    end
  
    def show
      @articleDatas = Article.includes(:learn_user).where("id = #{params[:id]}")
      @userDatas = @articleDatas[0].learn_user.email
    end
  
    def edit
    end
  
    private
      def set_article
        @article = Article.find(params[:id])
      end
  
      def article_params
        params.require(:article).permit(:title, :content, :browseCount, :likeCount, :learnUser)
      end
  
      def user_check
        puts "要查詢的id是 #{params[:learn_user_id]}"
        puts "目前所登入的id是 #{current_learn_user[:id]}"
        puts params[:learn_user_id] != current_learn_user[:id]
        if learn_user_signed_in? == false || params[:learn_user_id].to_s != current_learn_user[:id].to_s
            redirect_to '/404'
        end
      end
  end
  