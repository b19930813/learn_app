class LearnUsersController < ApplicationController
  before_action :authenticate_manager!
    def index
        @learn_users = LearnUser.all
    end
  
    def show
      @learn_user = LearnUser.find(params[:id])
      puts @learn_user.email
    end
    
    def new
        @learn_user = LearnUser.new
    end
    
    def edit
    end

    def create
        @learn_user = LearnUser.new(user_params)
    
        respond_to do |format|
          if @learn_user.save
            format.html { redirect_to @learn_user, notice: 'User was successfully created.' }
            format.json { render :show, status: :created, location: @learn_user }
          else
            format.html { render :new }
            format.json { render json: @learn_user.errors, status: :unprocessable_entity }
          end
    end
    
    def update
        respond_to do |format|
            if @learn_user.update(learn_user_params)
              format.html { redirect_to @learn_user, notice: 'User was successfully updated.' }
              format.json { render :show, status: :ok, location: @learn_user }
            else
              format.html { render :edit }
              format.json { render json: @learn_user.errors, status: :unprocessable_entity }
            end
          end
    end

    def destroy
        @learn_user.destroy
        respond_to do |format|
          format.html { redirect_to learn_users_url, notice: 'User was successfully destroyed.' }
          format.json { head :no_content }
        end
    end
    
    private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @learn_user = LearnUser.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def learn_user_params
      params.require(:learn_user).permit(:email, :password)
    end

  end
end
  