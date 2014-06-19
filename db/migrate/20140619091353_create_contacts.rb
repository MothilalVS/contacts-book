class CreateContacts < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
      t.string :firstname
      t.string :lastname
      t.string :emailid
      t.integer :mobileno
      t.string :address

      t.timestamps
    end
  end
end
