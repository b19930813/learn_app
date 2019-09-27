module API
    class Api::VocabulariesController < ApplicationController
        def index
            vocabularies = Vocabulary.all
              puts params['level']
              render json: { vocabularies: vocabularies }
        end
    end
end