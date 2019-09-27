module API
    class Api::VocabulariesController < ApplicationController
        def index
            case params['level']
            when '0'
              vocabularies = Vocabulary.all
            when '1'
                vocabularies = Vocabulary.all
            when '2'
                vocabularies = Vocabulary.all
            when '3'
                vocabularies = Vocabulary.all
            when '4'
                vocabularies = Vocabulary.all
            when '5'
                vocabularies = Vocabulary.all
            end
              render json: { vocabularies: vocabularies }
        end
    end
end