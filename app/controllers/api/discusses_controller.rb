module API
    class Api::DiscussesController < ApplicationController
        def index
            discusses = Discuss.where("level = #{params[:level]} and response_id = #{params[:responseID]}")
            #find user 
            
            render json: {discusses: discusses}
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