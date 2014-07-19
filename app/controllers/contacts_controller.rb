class ContactsController < ApplicationController
	$search_trigger=false
	def index
  	@contacts = Contact.where(pid: '1')
	end
	
	def new
	@contact = Contact.new
	end

	def create
		@contact = Contact.create(contact_params)
		photo
 		if @contact.save
  		redirect_to contact_path(@contact)
		else
		render 'new'
		end
	end
 
	def show
 	 @contact = Contact.find(params[:id])
	end
	
	def edit
 	 @contact = Contact.find(params[:id])
	end

	def update
	  @contact = Contact.find(params[:id])
	  cleanup
	  photo
	  if @contact.update(contact_params)
  	  redirect_to @contact
 	 else
   	 render 'edit'
 	 end
	end
 
	def destroy
  	@contact = Contact.find(params[:id])
  	@contact.destroy
  	File.delete("#{Rails.root}/public/data/#{@contact.upload}")
 
  	redirect_to contacts_path
	#render '/contacts/index'
	end

	def photo
		 name =  params[:contact][:upload].original_filename
		    directory = "public/data"
		    # create the file path
		    path = File.join(directory,name)
		    # write the file
		    File.open(path, "wb") { |f| f.write(params[:contact][:upload].read) }
		    @contact.upload = name
		end

 	def cleanup
    File.delete("#{Rails.root}/public/data/#{@contact.upload}") if File.exist?("#{Rails.root}/public/data/#{@contact.upload}")
	end



  def quicksearch
    q = params[:name]
    @contacts= Contact.where("firstname like ?  or lastname like ? or fullname like ?","#{q}%", "#{q}%","#{q}%" )
    render json: @contacts.as_json
  end

	def male
		@contacts= Contact.where(gender: "Male")
		render "index"
	end

	def female
		@contacts= Contact.where(gender: "female")
		render "index"
	end

	private
  	def contact_params
     # Contact.pid = User.id
    	params.require(:contact).permit(:firstname, :lastname, :emailid, :mobileno, :address, :gender)
  	end

end
