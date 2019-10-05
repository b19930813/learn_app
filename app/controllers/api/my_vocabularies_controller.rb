module API
    class Api::MyVocabulariesController < ApplicationController
        rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
        def index
            puts "有登入嗎?#{learn_user_signed_in?}"
            if learn_user_signed_in?
                #回傳該使用者的單字
                if params['ID'] == '0'
                    if params['searchV'].empty?
                       vocabularies = Vocabulary.where(id: MyVocabulary.where("learn_user_id = #{current_learn_user['id']}").select('vocabulary_id'))
                    else
                        vocabularies = Vocabulary.where(id: MyVocabulary.where("learn_user_id = #{current_learn_user['id']}").select('vocabulary_id')).where("katakana like '%#{params['searchV']}%' OR cnVocabulary like '%#{params['searchV']}%'")
                    end
                  else
                    #分類塞選
                    if params['searchV'].empty?
                    vocabularies = Vocabulary.where(id: MyVocabulary.where("learn_user_id = #{current_learn_user['id']}").select('vocabulary_id')).where("level = #{params['ID']}")
                    else
                        vocabularies = Vocabulary.where(id: MyVocabulary.where("learn_user_id = #{current_learn_user['id']}").select('vocabulary_id')).where("level = #{params['ID']}").where("katakana like '%#{params['searchV']}%' OR cnVocabulary like '%#{params['searchV']}%'")
                    end
                  end
                  render json: { vocabularies: vocabularies }
            else
                render json: {state: 401}
            end
                        
        end
        def create
            #user login
            if learn_user_signed_in?
            @myVocabulary = MyVocabulary.new(learn_user_id: current_learn_user['id'], vocabulary_id: params['vocabularyID'])
             if @myVocabulary.save
                render json: { state: 200}
             else
                #save fail!
                render json: { state: 400 }
             end
            else
                #user is not login
                render json: { state: 401}
            end
        end
        
        def destroy
            begin
                MyVocabulary.where("learn_user_id = #{current_learn_user['id']} AND vocabulary_id = #{params['id']}").destroy_all
                render json: { state: 200}
            rescue => exception 
                render jsion: {state: 404}
                puts exception
            end
        end

        private
        def record_not_found
            render plain: "查不到要加入的單字"
        end

    end
end
