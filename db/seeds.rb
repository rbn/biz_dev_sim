# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

g = Game.create( { title: 'DH Sim' } )

User.create(email: "admin@admin.com", password: "password123", password_confirmation: "password123")

# remove existing data

Question.all.each { |q| q.destroy } # TODO: use dependent keyword in models for this
Stage.all.each { |s| s.destroy }

# load yaml data
stage_data = YAML.load_file(Rails.root.join('db', 'stages.yml'))

stage_data[:stages].each do |d|
  puts d[:y]
end

# Hashery enables symbol-as-keys ( e.g. stage.id, stage.questions.number )
stage_data = Hashery::OpenCascade[stage_data]

# save
stage_data.stages.each do |d|

  # TODO: not using an interator here for now since we want to
  # omit the questions collection.  what's the better way to do 
  # this with ruby/yaml?

  puts d[:y]

  stage = Stage.new
  stage.internal_name = d.internal_name
  stage.label = d.label
  stage.x = d.x
  stage.y = d[:y] # TODO: heroku not picking up 'y' value - figure out why
  stage.r = d.r
  stage.nexts = d.nexts
  stage.start = d.start
  stage.color = d.color
  stage.page_layout = d.page_layout
  stage.featured_text = d.featured_text
  stage.featured_image_url = d.featured_image_url
  stage.featured_video_url = d.featured_video_url
  
  d.questions.each do |q|
    question = Question.new
    question.text = q.text
    question.answers = q.answers
    question.explanation = q.explanation
    stage.questions.push(question)
  end

  stage.save
end

