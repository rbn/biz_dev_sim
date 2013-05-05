class D3Controller < ApplicationController
  def index
  end

  def svg
    render layout: 'bare' 
  end

  def bubbles
    render layout: 'bare' 
  end

  def flare
    render :file => "#{Rails.root}/app/assets/data/flare.js",
      :content_type => 'application/json',
      :layout => false
  end
end
