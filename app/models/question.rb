class Question < ActiveRecord::Base
  attr_accessible :text, :answers, :html_style
  belongs_to :stage
  after_initialize :init

  def init
    @answer_set = AnswerSet.new(answers)
  end

  def answer_set
    @answer_set
  end
end
