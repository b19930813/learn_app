module API
    class Api::DiscussesController < ApplicationController
        def index
       
            discusses = Discuss.includes(:learn_user).where("level = #{params[:level]} and response_id = #{params[:responseID]}")
            userDatas = discusses.map(&:learn_user)
            #find user 
            
            #render json: {discusses: discusses , email: discusses.learn_user.email}
            render json: {discusses:discusses , userDatas:userDatas}
        end

       def create
          if learn_user_signed_in?
            @discusses = Discuss.new(learn_user_id: current_learn_user[:id],content: params[:content], response_id: params[:responseID], level: params[:level])
            if @discusses.save
                render json: {state:200}
            else
                render json: {state:400}
            end
        else
            render json: {state:401}
          end
       end
       
       def destroy
       end

       def update
       end
    
    end
end