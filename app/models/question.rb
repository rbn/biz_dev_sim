class Question < ActiveRecord::Base
  attr_accessible :text, :answers, :explanation, :html_style, :answers, :answers_attributes
  belongs_to :stage
  has_many :answers
end
