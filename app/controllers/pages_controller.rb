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
  end

  def myVocabulary
    if @login == false
      render 'pages/login'
    end
  end

  def myPlan
  end

  def discuss
  end

  def myAccount
  end
  
  def login

  end

  private
  def isLogin
    @login = learn_user_signed_in?
  end

end
