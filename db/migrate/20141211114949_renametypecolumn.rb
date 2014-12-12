class Renametypecolumn < ActiveRecord::Migration
  def change
  	rename_column :signups, :type, :age
  end
end
