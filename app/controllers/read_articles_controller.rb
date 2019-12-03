class ReadArticlesController < ApplicationController
    def index
    end

    def show
        @ArticleData = LearnArticle.find(params[:id])
    end
end