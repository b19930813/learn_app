module API
    class Api::VocabulariesController < ApplicationController
        def index
              #puts current_learn_user['id']
              vocabularies = Vocabulary.all
              render json: { vocabularies: vocabularies }
        end
    end
end