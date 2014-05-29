class MealsController < ApplicationController
  def index

    unless cookies.has_key?("name")
      redirect_to '/user'
    end

    signups_from_db = Signup.where(:name => cookies[:name]).where("day >= ?", Date.today)

    @signups = {}

    signups_from_db.each do |signup|

      if @signups[signup.day.strftime("%Y/%m/%d")].blank?
        @signups[signup.day.strftime("%Y/%m/%d")] = {'breakfast'=>[], 'lunch'=>[], 'dinner'=>[]}
      end

      @signups[signup.day.strftime("%Y/%m/%d")][signup.meal].push(signup.id)

    end

  end
end