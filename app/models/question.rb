class Question < ActiveRecord::Base
  attr_accessible :text, :answers, :explanation, :html_style
  belongs_to :stage

  def answer_set
    @answer_set = AnswerSet.new(answers) unless @answer_set
    @answer_set
  end
end
