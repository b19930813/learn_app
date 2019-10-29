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

  def learnVocabulary
    @vocabularies = Vocabulary.all.page(params[:page]).per(5)
    @vocabulariesCount = Vocabulary.count
  end

  def myVocabulary
    if isLogin 
      
    else
      render 'pages/login'
    end
  end

  def myPlan
  end

  def discuss
  end

  def myAccount
    if isLogin
      user = LearnUser.find(current_learn_user[:id])
      @userData = {email: user[:email], id: user[:id]}
    else
      render 'pages/login'
    end
  end
  
  private
  def isLogin
    learn_user_signed_in?
  end

end
