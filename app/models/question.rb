class Question < ActiveRecord::Base
  attr_accessible :text, :answers, :html_style
  belongs_to :stage
end
