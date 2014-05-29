class SignupsController < ApplicationController
  def create

    signup = Signup.create!(day: params[:day], meal: params[:meal], name: params[:name])
    number_of_signups_for_this_person_at_this_meal_on_this_day = Signup.where(:name => cookies[:name]).where(:day => params[:day]).where(:meal => params[:meal]).count

    render :json => {
      :number_of_signups_for_this_person_at_this_meal_on_this_day => number_of_signups_for_this_person_at_this_meal_on_this_day
    }

  end

  def destroy

  	signup = Signup.where(day: params[:day], meal: params[:meal], name: params[:name]).first
  	signup.destroy

    number_of_signups_for_this_person_at_this_meal_on_this_day = Signup.where(:name => cookies[:name]).where(:day => params[:day]).where(:meal => params[:meal]).count
    render :json => {
      :number_of_signups_for_this_person_at_this_meal_on_this_day => number_of_signups_for_this_person_at_this_meal_on_this_day
    }

  end

end
