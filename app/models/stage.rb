class Stage < ActiveRecord::Base
  serialize :nexts, Array
  attr_accessible :label, :nexts, :start, :x, :y, :r, :color, :content, 
                    :page_layout, :featured_image_url, :featured_text

  def form
    "form_#{page_layout}"
  end

  def template 
    "stages/page_layout_#{page_layout}"
  end
end
