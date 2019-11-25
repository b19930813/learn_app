class LearnArticlesController < ApplicationController
  before_action :set_learn_article, only: [:show, :edit, :update, :destroy]
  protect_from_forgery with: :null_session
  # GET /learn_articles
  # GET /learn_articles.json
  def index
    @learn_articles = LearnArticle.all
  end

  # GET /learn_articles/1
  # GET /learn_articles/1.json
  def show
  end

  # GET /learn_articles/new
  def new
    @learn_article = LearnArticle.new
  end

  # GET /learn_articles/1/edit
  def edit
  end

  # POST /learn_articles
  # POST /learn_articles.json
  def create
    @learn_article = LearnArticle.new(learn_article_params)

    respond_to do |format|
      if @learn_article.save
        format.html { redirect_to @learn_article, notice: 'Learn article was successfully created.' }
        format.json { render :show, status: :created, location: @learn_article }
      else
        format.html { render :new }
        format.json { render json: @learn_article.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /learn_articles/1
  # PATCH/PUT /learn_articles/1.json
  def update
    respond_to do |format|
      if @learn_article.update(learn_article_params)
        format.html { redirect_to @learn_article, notice: 'Learn article was successfully updated.' }
        format.json { render :show, status: :ok, location: @learn_article }
      else
        format.html { render :edit }
        format.json { render json: @learn_article.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /learn_articles/1
  # DELETE /learn_articles/1.json
  def destroy
    @learn_article.destroy
    respond_to do |format|
      format.html { redirect_to learn_articles_url, notice: 'Learn article was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_learn_article
      @learn_article = LearnArticle.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def learn_article_params
      params.require(:learn_article).permit(:title, :content, :is_avilable, :author, :level, :popular)
    end
end
