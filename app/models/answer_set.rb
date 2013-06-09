class AnswerSet
  def initialize(json)
    @answers = {}

    JSON.parse(json).each_pair do |k, v|
      a = Answer.new(k, v["text"], v["correct"])
      @answers[k] = a
    end

  end

  def answers
    @answers
  end
end

