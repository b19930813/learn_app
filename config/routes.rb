Rails.application.routes.draw do
  root "pages#index" 
  scope  path: "frankgogo" do
    resources :users
  end
  
  namespace :api, defaults: { format: 'json' } do
    resources :users, only: [:index, :create]
    resources :posts, only: [:index, :create]
  end

  get 'pages/index'
  get 'pages/show', to: "pages#show"
  get "pages/createPost"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
