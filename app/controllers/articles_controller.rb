class ArticlesController < ApplicationController
  before_action :set_article, only: [:show, :edit, :update, :destroy]

  def index
    @articleData =  Article.all.page(params[:page]).per(10)
  end

  def show
    
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
end
