module API
    class Api::VocabulariesController < ApplicationController
        def index
            vocabularies = Vocabulary.all
           
              render json: { vocabularies: vocabularies }
        end
    end
end