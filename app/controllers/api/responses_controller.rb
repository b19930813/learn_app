module API
    class Api::ResponsesController < ApplicationController
      def index
        responses = Response.includes(:learn_user).where("article_id = #{params[:id]}")
        userDatas = responses.map(&:learn_user)
        count = Response.where("article_id = #{params[:id]}").count
        render json: {answers:responses, userDatas:userDatas , count: count}
      end

      def create
        if learn_user_signed_in?
          @responses = Response.new(learn_user_id: current_learn_user[:id], content: params[:content],article_id: params[:articleID])
          if @responses.save
              render json: {state:200}
          else
              render json: {state:400}
          end
         else
         render json: {state: 401}
         end
      end

      def destroy
      end

      def show
      end

      def update
      end
    end
end