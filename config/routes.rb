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
    resources :adminarticles
    resources :learn_articles
  end
  
  namespace :api, defaults: { format: 'json' } do
    resources :learn_users, only: [:create, :destroy, :show, :index, :update]
    resources :posts
    resources :vocabularies, only: [:index, :destroy]
    resources :my_vocabularies
    resources :sessions
    resources :discusses, only: [:create, :destroy, :show, :index, :update]
    resources :responses, only: [:create, :destroy, :show, :index, :update]
    resources :articles, only: [:create, :destroy, :show, :index, :update]
  end

  resources :articles, only: [:show,:index]
  get 'pages/index'
  get 'pages/login', to: "pages#login"
  get 'pages/show', to: "pages#show"
  get "pages/createPost"
  get 'learnVocabulary', to: "pages#learnVocabulary"
  get 'myVocabulary', to: "pages#myVocabulary"
  get 'myPlan', to: "pages#myPlan"
  get 'myAccount', to: "pages#myAccount"
  get 'createArticles', to: "pages#createArticle"
  get 'learnArticles', to: "pages#learnArticle"
  get 'myArticles', to: 'pages#myArticle'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
