module API
    class Api::VocabulariesController < ApplicationController
        def index
              #沒有分類的情況
              if params['ID'] == '0'
                if params['searchV'].empty?
                   vocabularies = Vocabulary.all.page(params[:page]).per(5)
                   count = Vocabulary.all.count
                else
                   vocabularies = Vocabulary.where("katakana like '%#{params['searchV']}%' OR cnVocabulary like '%#{params['searchV']}%'").page(params[:page]).per(5)
                   count = Vocabulary.where("katakana like '%#{params['searchV']}%' OR cnVocabulary like '%#{params['searchV']}%'").count
                end
              else
                #分類塞選
                if params['searchV'].empty?
                    vocabularies = Vocabulary.where("level = #{params['ID']}").page(params[:page]).per(5)
                    count = Vocabulary.where("level = #{params['ID']}").count
                else
                    vocabularies = Vocabulary.where("level = #{params['ID']}").where("katakana like '%#{params['searchV']}%' OR cnVocabulary like '%#{params['searchV']}%'").page(params[:page]).per(5)
                    count = Vocabulary.where("level = #{params['ID']}").where("katakana like '%#{params['searchV']}%' OR cnVocabulary like '%#{params['searchV']}%'").count
                end
              end
              render json: { vocabularies: vocabularies , vocabulariesCount: count }
        end
    end
end