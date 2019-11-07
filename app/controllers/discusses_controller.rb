class DiscussesController < ApplicationController
  before_action :set_discuss, only: [:show, :edit, :update, :destroy]

  # GET /discusses
  # GET /discusses.json
  def index
    @discusses = Discuss.all
  end

  # GET /discusses/1
  # GET /discusses/1.json
  def show
  end

  # GET /discusses/new
  def new
    @discuss = Discuss.new
  end

  # GET /discusses/1/edit
  def edit
  end

  # POST /discusses
  # POST /discusses.json
  def create
    @discuss = Discuss.new(discuss_params)

    respond_to do |format|
      if @discuss.save
        format.html { redirect_to @discuss, notice: 'Discuss was successfully created.' }
        format.json { render :show, status: :created, location: @discuss }
      else
        format.html { render :new }
        format.json { render json: @discuss.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /discusses/1
  # PATCH/PUT /discusses/1.json
  def update
    respond_to do |format|
      if @discuss.update(discuss_params)
        format.html { redirect_to @discuss, notice: 'Discuss was successfully updated.' }
        format.json { render :show, status: :ok, location: @discuss }
      else
        format.html { render :edit }
        format.json { render json: @discuss.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /discusses/1
  # DELETE /discusses/1.json
  def destroy
    @discuss.destroy
    respond_to do |format|
      format.html { redirect_to discusses_url, notice: 'Discuss was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_discuss
      @discuss = Discuss.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def discuss_params
      params.require(:discuss).permit(:content, :level, :response, :learn_user)
    end
end
