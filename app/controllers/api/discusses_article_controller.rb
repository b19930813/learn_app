module API
    class Api::DiscussesArticleController < ApplicationController
        protect_from_forgery with: :null_session
        def index
            discusses = DiscussArticle.includes(:learn_user).where(article_id: article_params)
            userDatas = discusses.map(&:learn_user)
            #find user 
            render json: {discusses:discusses , userDatas:userDatas}
        end

       def create
        puts discuss_params
        #Find currentUser 
        user = LearnUser.find(current_learn_user[:id])
        #user.discuss_article << 
        #   if learn_user_signed_in?
        #     @discusses = DiscussArticle.new(learn_user_id: current_learn_user[:id],content: params[:content], response_id: params[:responseID])
        #     if @discusses.save
        #         render json: {state:200}
        #     else
        #         render json: {state:400}
        #     end
        # else
        #     render json: {state:401}
        #   end
       end
       
       def destroy
       end

       def update
       end

       private 
       def article_params
        params.require(:article_id)
       end
    
       def discuss_params
        params.require(:discusses_article).permit(:content,:responseID)
       end
    end
end