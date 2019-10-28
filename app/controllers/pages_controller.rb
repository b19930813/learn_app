class PagesController < ApplicationController
  before_action :isLogin
  @mynumber = "test number"
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
    if login == false
      render 'pages/login'
    end
  end

  def myPlan
  end

  def discuss
  end

  def myAccount
    if @login
      user = LearnUser.find(current_learn_user[:id])
      @userData = {email: user[:email], id: user[:id]}
    else
      render 'pages/login'
    end
  end
  
  def login

  end

  private
  def isLogin
    @login = learn_user_signed_in?
  end

end
