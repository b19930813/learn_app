module API
    class Api::PostsController < ApplicationController
      def index
        posts = ['Post 1', 'Post 2']
        
        render json: { posts: posts }
      end
      def create 
        #puts params["title"]
        users = User.all
        users.each do |user|
          puts user.password
        end
        render json: params["data"]
      end
  end
end