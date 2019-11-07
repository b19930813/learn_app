Rails.application.routes.draw do


  devise_for :models
  devise_for :managers
  devise_for :learn_users
  root "pages#index" 


  scope  path: "frankgogo" do
    resources :users
    resources :vocabularies
    resources :discusses
    resources :responses
    resources :articles
  end
  
  namespace :api, defaults: { format: 'json' } do
    resources :learn_users, only: [:create, :destroy, :show, :index, :update]
    resources :posts
    resources :vocabularies, only: [:index, :destroy]
    resources :my_vocabularies
    resources :sessions
    resources :discuss, only: [:create, :destroy, :show, :index, :update]
    resources :responses, only: [:create, :destroy, :show, :index, :update]
    resources :articles, only: [:create, :destroy, :show, :index, :update]
  end
  # test ruotes 
  get 'pages/index'
  get 'pages/login', to: "pages#login"
  get 'pages/show', to: "pages#show"
  get "pages/createPost"
  get 'learnJP', to: "pages#learnJP"
  get 'learnVocabulary', to: "pages#learnVocabulary"
  get 'myVocabulary', to: "pages#myVocabulary"
  get 'myPlan', to: "pages#myPlan"
  get 'discuss', to: "pages#discuss"
  get 'myAccount', to: "pages#myAccount"
  get 'createArticles', to: "pages#createArticle"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
