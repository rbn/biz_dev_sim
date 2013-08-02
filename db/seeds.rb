# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# g = Game.create( { title: 'DH Sim' } )

require 'active_record/fixtures'

User.create(email: "admin@admin.com", password: "password123", password_confirmation: "password123")

# remove existing data

Stage.all.each { |s| s.destroy }


# load yaml data
data = YAML.load_file(Rails.root.join('db', 'stages.yml'))

# Hashery enables symbol-as-keys ( e.g. stage.id, stage.questions.number )
data = Hashery::OpenCascade[data]

# save
data.stages.each do |s|
  puts s.nexts
  stage = Stage.create(internal_name: s.internal_name, label: s.label,
                       start: s.start,
                       x: s.x,
                       y: s.y,
                       r: s.r,
                       nexts: s.nexts,
                       color: s.color,
                       page_layout: s.page_layout,
                       featured_text: s.featured_text)

  s.questions.each do |q|
    question = stage.questions.create(text: q.text, explanation: q.explanation)
    q.answers.each do |a|
      question.answers.create(text: a.text, value: a.value)
    end
  end
end

