Rails.application.routes.draw do
  scope  path: "frankgogo" do
    resources :users
  end
  
  namespace :api, defaults: { format: 'json' } do
    resources :users, only: [:index, :create]
  end

  get 'pages/index'
  get 'pages/show', to: "pages#show"
  get "/" , to: "pages#index"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
