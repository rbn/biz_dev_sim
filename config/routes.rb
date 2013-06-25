BizDevSim::Application.routes.draw do
  resources :questions
  resources :stages
  resources :home
  resources :d3
  resources :game
  devise_for :users

  match 'd3/svg' => 'd3#svg'
  match 'bubbles' => 'd3#bubbles'
  match 'flare' => 'd3#flare'
  match 'board_data' => 'd3#board_data'
  match 'board' => 'd3#board'
  match 'data' => 'home#data'
  match 'boxes' => 'home#boxes'
  match 'svg' => 'd3#svg'
  match 'svg2' => 'd3#svg2'
  match 'bds' => 'd3#svg3'
  match 'veroni' => 'd3#veroni'
  match 'samplestage' => 'stages#samplestage'
  match 'stage_data' => 'stages#stage_data'
  match 'check' => 'questions#check', via: [:post, :put]
  # TODO: move these actions to proper controller
  match 'dashboard' => 'stages#dashboard'
  match 'left' => 'stages#left'
  match 'admin' => 'admin#index'

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'
  root :to => 'game#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
