Rails.application.routes.draw do
  resources :users
  resources :events
  resources :posts
  match '*path' => 'options_request#response_preflight_request', via: :options
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
