module API
    class Api::MyVocabulariesController < ApplicationController
        def index
            posts = ['Post 1', 'Post 2']
            render json: { posts: posts }
        end
        def create
            
        end
    end
end