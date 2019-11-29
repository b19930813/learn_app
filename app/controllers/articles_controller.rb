class ArticlesController < ApplicationController
  before_action :set_article, only: [:show, :edit, :update, :destroy]

  def index
    @articleDatas =  Article.includes(:learn_user).page(params[:page]).order("updated_at DESC")
    @userDatas = @articleDatas.map(&:learn_user)
  end

  def show
    @articleDatas = Article.includes(:learn_user).where("id = #{params[:id]}")
    @userDatas = @articleDatas[0].learn_user.email
  end

  def edit
    #傳入當前使用者的資料
    if learn_user_signed_in?
    @userData = User.find(current_learn_user[:id])
    end
  end

  private
    def set_article
      @article = Article.find(params[:id])
    end

    def article_params
      params.require(:article).permit(:title, :content, :browseCount, :likeCount, :learnUser)
    end
end
