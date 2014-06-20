class AddUploadToContacts < ActiveRecord::Migration
  def change
    add_column :contacts, :upload, :string
  end
end
