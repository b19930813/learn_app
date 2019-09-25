Rails.application.routes.draw do

  devise_for :models
  devise_for :managers
  devise_for :learn_users
  root "pages#index" 


  scope  path: "frankgogo" do
    resources :users
    resources :vocabularies
  end
  
  namespace :api, defaults: { format: 'json' } do
    resources :users, only: [:index, :create]
    resources :posts, only: [:index, :create]
  end
  # test ruotes 
  get 'pages/index'
  get 'pages/show', to: "pages#show"
  get "pages/createPost"
  get 'pages/learnJP'
  get 'pages/learnVocabulary'
  get 'pages/myVocabulary'
  get 'pages/myPlan'
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
