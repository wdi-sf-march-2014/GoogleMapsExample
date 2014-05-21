class PinsController < ApplicationController
  def index
     @pins = Pin.all

    respond_to do |f|
      f.json { render :json => @pins}
    end
  end

  def new

  end

  def create
    @pin = Pin.new(pin_params)
    respond_to do |format|
      if @pin.save
        format.json { render json: @pin, status: :created}
      else
        format.json { render json: @pin.errors, status: :unprocessable_entity }
      end
    end
  end

  private
  def pin_params
    params.require(:pin).permit(:latitude, :longitude)
  end

end
