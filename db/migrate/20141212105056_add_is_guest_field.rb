class AddIsGuestField < ActiveRecord::Migration
  def change
  	add_column :signups, :is_guest, :boolean
  end
end
