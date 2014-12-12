class AddBillToField < ActiveRecord::Migration
  def change
	add_column :signups, :bill_to, :string
  end
end
