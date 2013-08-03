class Answer < ActiveRecord::Base
  attr_accessible :text, :value
  belongs_to :question

  def correct?
    !!value
  end
end

