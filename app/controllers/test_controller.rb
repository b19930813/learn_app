class TestController < ApplicationController
   def show 
    puts LearnUser.all
   end

   def index
      #show = LearnUser.includes(:article).find(2)
      show = MyVocabulary.includes(:learn_user,:vocabulary).where(:learn_user_id => 23).first
  
      #render json: {data:show.article.first.title}
      render json: {data:show.vocabulary}
   end

end

