module API
    class Api::ArticlesController < ApplicationController
        protect_from_forgery with: :null_session
        def index
            @articles = Article.all.page(params[:page]).per(10)
        end

        def show
        end

        def create
           if learn_user_signed_in?
               #驗證身分
               user = LearnUser.find(current_learn_user[:id])
                    @articles = Article.new(learn_user_id: current_learn_user[:id], title: params[:title], content: params[:content])
                    if @articles.save
                        render json: {state:200}
                    else
                        render json: {state:400}
                    end
           else
           render json: {state: 401}
           end
        end

        def destroy
         
            if user_verification
                begin
                    #不知道為啥無法刪除
                    # my_article = Article.find_by(params[:id])
                    # my_articel.destroy
                    Article.where("id = #{params[:id]}").destroy_all
                    render json: {state:200}
                rescue => exception
                    render json: {state:400}
                end
           
            else
                render json: {state: 402} #登入使用者跟打API使用者不同
            end
        end

        def update
            #判斷是否登入
            #驗證身分: 文章id必須與當前使用者相符
            if user_verification
                my_article = Article.find_by(params[:id])
                my_article.title = params[:title]
                my_article.content = params[:content]
                if my_article.save
                    render json: {state: 200}
                else
                    render json: {state: 400}
                end
                #取出資料
            else
                render json: {state: 402} #登入使用者跟打API使用者不同
            end
        end
        
        private 
        #驗證api傳來的使用者id跟當前的使用者id是否相等
        def user_verification
            #判別是否有login
            if learn_user_signed_in? == false
                render json: {state: 401}
                return false
            elsif params[:userID]  != current_learn_user[:id]
                
                render json: {state: 402}
                return false
            else
                return true
            end
        end

    end
end