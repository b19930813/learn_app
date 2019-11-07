class PagesController < ApplicationController
  before_action :isLogin
  def index
  end

  def show
  end

  def createPost
  end

  def learnJP
  end

  def createArticle
    if isLogin
      user = LearnUser.find(current_learn_user[:id])
      @userData = { id: user[:id]}
    else
      
    end
    
  end

  def learnVocabulary
    @vocabularies = Vocabulary.all.page(params[:page]).per(5)
    @vocabulariesCount = Vocabulary.count
  end

  def myVocabulary
    @userLogin = isLogin
    if isLogin 
     @myVocabularies = Vocabulary.where(id: MyVocabulary.where("learn_user_id = #{current_learn_user[:id]}").select('vocabulary_id'))
    end
  end

  def myPlan
    puts LearnUser.find(current_learn_user[:id])
  end

  def discuss
    if isLogin 
      user = LearnUser.find(current_learn_user[:id])
      @userData = {id: user[:id]}
    end
      #取得前10筆文章的標題
      #find user email
      findUser = LearnUser.where("learn_user_id = 2")
      @articleData =  Article.all.page(params[:page]).per(10)
  end

  def myAccount
    if isLogin
      user = LearnUser.find(current_learn_user[:id])
      @userData = {email: user[:email], id: user[:id]}
    else
      render 'pages/login'
    end
  end
  
  def login
    if isLogin != false
      render 'pages/error'
    end
  end

  def register
    if isLogin
      render 'pages/index'
    end
  end
  
  def error
  end

  private
  def isLogin
    learn_user_signed_in?
  end

end
