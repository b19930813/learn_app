module API
    class Api::MyVocabulariesController < ApplicationController
        protect_from_forgery with: :null_session
        rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    
        def index
            if learn_user_signed_in?
                #回傳該使用者的單字
                @user = LearnUser.includes(:myVocabulary).find(current_learn_user[:id])
                @vocabularies = @user.myVocabulary.map(&:vocabulary)
                #在顯示全部的單字下，進行搜尋
                if level_params.to_i === 0
                    #在有使用者搜尋的情況下
                    if params['searchV'].empty? == false
                         @vocabularies = @vocabularies.select { |v| v.katakana.include?(search_params) || v.cnVocabulary.include?(search_params) }
                    end
                else
                    @vocabularies = @vocabularies.select { |v| v.level ===  level_params.to_i }
                    #分類塞選
                    if params['searchV'].empty? == false
                        #vocabularies = Vocabulary.where(id: MyVocabulary.where("learn_user_id = #{current_learn_user['id']}").select('vocabulary_id')).where("level = #{params['ID']}").where("katakana like '%#{params['searchV']}%' OR cnVocabulary like '%#{params['searchV']}%'")
                        @vocabularies  =  @vocabularies.select { |v| v.katakana.include?(search_params) || v.cnVocabulary.include?(search_params) }
                    end
                end
                    render json: { vocabularies:  @vocabularies}
            else
                render json: {state: 401}
            end 
        end

        def create
            #user login
            if learn_user_signed_in? 
                user = LearnUser.find(current_learn_user['id'])
                user.myVocabulary.new(vocabulary_id: vocabulary_params)
                if user.save
                    render json: { state: 200}
                else
                    render json: { state: 400 }
                end
            else
                render json: {state:401}
            end
        end
        
        def destroy
            if learn_user_signed_in?
                user = LearnUser.find(current_learn_user[:id])
                #驗證身分
                begin   
                    user.myVocabulary.where("vocabulary_id = #{delete_params}").destroy_all
                    render json: { state: 200}
                rescue => exception 
                    render json: {state: 404}
                end
            else
                render json: {state: 401}
            end
        end

        private
        def record_not_found
            render plain: "查不到要加入的單字"
        end
        
        #單字
        def vocabulary_params
            params.require(:vocabularyID)
        end

        def search_params
            params.require(:searchV)
        end

        def level_params 
            params.require(:ID)
        end

        def delete_params
            params.require(:id)
        end
    end
end
