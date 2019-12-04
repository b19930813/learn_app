class MyArticlesController < ApplicationController
    before_action :set_article, only: [:show, :edit, :update, :destroy]
  
    def index
      user_check
     # @articleDatas =  Article.where("learn_user_id = #{params[:learn_user_id]}").page(params[:page]).order("created_at DESC").per(5)
     # @userDatas = @articleDatas.map(&:learn_user)
     #傳入使用者資料 跟 該 使用者的文章
     @articleData = Article.where("learn_user_id = #{current_learn_user[:id]}").page(params[:page]).order("created_at DESC").per(5)
     @articleCount = Article.where("learn_user_id = #{current_learn_user[:id]}").count
     user = LearnUser.find(current_learn_user[:id])
     #傳入使用者資料 跟 該 使用者的文章
     @userData = {email: user[:email], id: user[:id], access_token: user[:access_token]}
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
        # puts "要查詢的id是 #{params[:learn_user_id]}"
        # puts "目前所登入的id是 #{current_learn_user[:id]}"
        # puts params[:learn_user_id] != current_learn_user[:id]
        if learn_user_signed_in? == false || params[:learn_user_id].to_s != current_learn_user[:id].to_s
            redirect_to '/404'
        end
      end
  end
  