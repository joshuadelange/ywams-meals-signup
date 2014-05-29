class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def user_edit
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

    unless @start_date.blank?
      where = "day >= '#{@start_date}'"
    end

    unless @end_date.blank?
      where = "day <= '#{@end_date}'"
    end

    @signups = Signup.select('name, meal, count(*) as times').where(where).group('name, meal').order('name')
  end

end
