class SignupsController < ApplicationController
  def create
    signup = Signup.create!(day: params[:day], meal: params[:meal], name: params[:name])
    render :json => signup
  end
end
