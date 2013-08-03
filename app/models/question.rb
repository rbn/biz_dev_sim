class Question < ActiveRecord::Base
  attr_accessible :text, :answers, :explanation, :html_style, :answers, :answers_attributes
  belongs_to :stage
  has_many :answers
  accepts_nested_attributes_for :answers, reject_if: lambda { |a| a[:content].blank? }, allow_destroy: true

end
