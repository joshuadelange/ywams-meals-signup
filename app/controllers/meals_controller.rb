class MealsController < ApplicationController

  def index

    unless cookies.has_key?("name")
      redirect_to '/user'
    end

    @starting_date = Date.today

    if params[:starting_date]
      @starting_date = Date.parse(params[:starting_date])
    end

    signups_from_db = Signup.where(:name => cookies[:name]).where("day >= ?", @starting_date)

    @signups = {}

    signups_from_db.each do |signup|

      if @signups[signup.day.strftime("%Y/%m/%d")].blank?
        @signups[signup.day.strftime("%Y/%m/%d")] = {'breakfast' => {'adult' => 0, 'child' => 0}, 'lunch' => {'adult' => 0, 'child' => 0}, 'dinner' => {'adult' => 0, 'child' => 0}}
      end

      @signups[signup.day.strftime("%Y/%m/%d")][signup.meal][signup.age] += 1

    end

  end

  def edit

    @date = params[:date].to_time
    @meal = params[:meal]

    @signups = Signup.where(:name => cookies[:name]).where("day = ? and meal = ?", @date.strftime("%Y/%m/%d"), @meal)

  end

  skip_before_action :verify_authenticity_token

  def save

    print "sup"

    Signup.destroy_all(:day => params[:date], :meal => params[:meal])

    params[:signups].each do |key, value|
      print "\n\n"
      print value.inspect
      print "\n\n"
      
      signup = Signup.create!(day: params[:date], meal: params[:meal], name: cookies[:name], bill_to: value[:bill_to], is_guest: value[:is_guest], age: value[:age])
    end

    redirect_to "/"

  end

end