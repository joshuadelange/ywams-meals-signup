class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def user_edit
  end

  def kitchen

    signups_from_db = Signup.where("day >= ?", Date.today)

    @signups = {}

    signups_from_db.each do |signup|

      if @signups[signup.day.strftime("%Y/%m/%d")].blank?
        @signups[signup.day.strftime("%Y/%m/%d")] = {'breakfast' => {'adult' => 0, 'child' => 0}, 'lunch' => {'adult' => 0, 'child' => 0}, 'dinner' => {'adult' => 0, 'child' => 0}}
      end

      @signups[signup.day.strftime("%Y/%m/%d")][signup.meal][signup.age] += 1

    end

  end

  def kitchen_detail

    @date = params[:date].to_time
    @meal = params[:meal]

    @signups = Signup.where(:name => cookies[:name]).where("day = ? and meal = ?", @date.strftime("%Y/%m/%d"), @meal)

  end

  def reports

    where = ''

    @start_date = params[:start_date]
    if @start_date.blank?
      @start_date = Date.today
    end

    @end_date = params[:end_date]
    if @end_date.blank?
      @end_date = Date.today + 30
    end

    unless @start_date.blank? or @end_date.blank?
      where = "day >= '#{@start_date}' and day <= '#{@end_date}'"
    end

    @signups = Signup.select('name, meal, count(*) as times').where(where).group('name, meal').order('name')
  end

end
