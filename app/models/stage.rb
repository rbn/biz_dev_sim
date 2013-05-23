class Stage < ActiveRecord::Base
  serialize :next, Array
  attr_accessible :label, :next, :start, :x, :y, :r, :color, :content
end
