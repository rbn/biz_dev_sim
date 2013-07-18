class Stage < ActiveRecord::Base
  default_scope order('id ASC')
  serialize :nexts, Array
  attr_accessible :internal_name, :label, :nexts, :start, :x, :y, :r, :color, :content, 
                  :page_layout, :featured_image_url, :featured_text,
                  :featured_video_url
  has_many :questions

  def form
    "form_#{page_layout}"
  end

  def template 
    "stages/page_layout_#{page_layout}"
  end
end
