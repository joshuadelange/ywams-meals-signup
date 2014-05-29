class MealsController < ApplicationController
  def index

    unless cookies.has_key?("name")
      redirect_to '/user'
    end

    signups_from_db = Signup.where(:name => cookies[:name]).where("day >= ?", Date.today)

    @signups = {}

    signups_from_db.each do |signup|

      if @signups[signup.day.strftime("%Y/%m/%d")].blank?
        @signups[signup.day.strftime("%Y/%m/%d")] = {'breakfast'=> 0, 'lunch'=> 0, 'dinner'=> 0}
      end

      @signups[signup.day.strftime("%Y/%m/%d")][signup.meal] += 1

    end

  end
end