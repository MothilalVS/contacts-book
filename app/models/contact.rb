class Contact < ActiveRecord::Base
	validates :firstname, presence: true, length: {minimum:3}
	validates :lastname, presence: true, length: {minimum:1}
	validates_format_of :emailid, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, uniqueness:true
    	validates :mobileno, presence: true, length: {is: 10},numericality: { only_integer: true }
	validates :address, presence: true 
end
