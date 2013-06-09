class Answer
  attr_accessor :id, :text, :value
  def initialize(id, text, is_correct)
    @id = id
    @text = text 
    @is_correct = is_correct
  end

  def correct?
    @is_correct == "true"
  end
end

