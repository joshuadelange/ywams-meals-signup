class AddTypeToMeal < ActiveRecord::Migration
  def change
  	add_column :signups, :type, :string
  end
end
