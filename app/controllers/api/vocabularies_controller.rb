module API
    class Api::VocabulariesController < ApplicationController
        def index
              #puts current_learn_user['id']
              #沒有分類的情況
              if params['ID'] == '0'
                if params['searchV'].empty?
                   vocabularies = Vocabulary.all
                else
                    vocabularies = Vocabulary.where("katakana like '%#{params['searchV']}%' OR cnVocabulary like '%#{params['searchV']}%'")
                end
              else
                #分類塞選
                if params['searchV'].empty?
                vocabularies = Vocabulary.where("level = #{params['ID']}")
                else
                    vocabularies = Vocabulary.where("level = #{params['ID']}").where("katakana like '%#{params['searchV']}%' OR cnVocabulary like '%#{params['searchV']}%'")
                end
              end
              render json: { vocabularies: vocabularies }
        end
    end
end