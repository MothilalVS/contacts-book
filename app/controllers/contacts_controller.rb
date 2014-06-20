class ContactsController < ApplicationController
	def index
  	@contacts = Contact.all
	end
	
	def new
	@contact = Contact.new
	end

	def create
		@contact = Contact.new(contact_params)
		photo
 		if @contact.save
  		redirect_to @contact
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
 
  	redirect_to contacts_path
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

	private
  	def contact_params

    	params.require(:contact).permit(:firstname, :lastname, :emailid, :mobileno, :address)
  	end

end
