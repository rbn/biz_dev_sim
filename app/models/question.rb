class Question < ActiveRecord::Base
  attr_accessible :text, :answers, :explanation, :html_style, :answers, :answers_attributes
  belongs_to :stage
  has_many :answers, dependent: :destroy
  accepts_nested_attributes_for :answers, allow_destroy: true

end
