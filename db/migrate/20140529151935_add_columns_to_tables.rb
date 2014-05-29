class AddColumnsToTables < ActiveRecord::Migration
  def change
  	add_column :signups, :day, :date
  	add_column :signups, :name, :string
  	add_column :signups, :meal, :string
  end
end
