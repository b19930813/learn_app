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
    resources :users, only: [:index, :create, :destroy]
    resources :posts
    resources :vocabularies, only: [:index, :destroy]
    resources :my_vocabularies
    resource :sessions
  end
  # test ruotes 
  get 'pages/index'
  get 'pages/show', to: "pages#show"
  get "pages/createPost"
  get 'learnJP', to: "pages#learnJP"
  get 'learnVocabulary', to: "pages#learnVocabulary"
  get 'myVocabulary', to: "pages#myVocabulary"
  get 'myPlan', to: "pages#myPlan"
  get 'pages/learnVocabulary'
  get 'pages/myVocabulary'
  get 'pages/myPlan'
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
