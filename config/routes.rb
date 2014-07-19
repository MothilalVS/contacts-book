Rails.application.routes.draw do

  #devise_for :super_users
  devise_for :users
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
 get 'contacts/quicksearch'
 get 'contacts/male'
 get 'contacts/female'
 get  'contacts/index'
 	resources :contacts
  root  'contacts#index'
end

