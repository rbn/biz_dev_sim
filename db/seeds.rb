# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'yaml'

# TODO: figure out mass-assignment issue

g = Game.create( { title: 'DH Sim' } )

User.create(email: "admin@admin.com", password: "password123", password_confirmation: "password123")

# remove all stages
Question.all.each { |q| q.destroy } # TODO: use dependent keyword in models for this
Stage.all.each { |s| s.destroy }


# stages = YAML.load_file(Rails.root.join('db', 'stages.json'))
stages = JSON.parse( IO.read(Rails.root.join('db', 'stages.json')) )

stages.each do |s|
  stage = Stage.new
  stage.update_attributes(s)
  stage.save
end

# TODO: add "nexts" here - but return to 
# find a way to put it in original JSON file

eval( IO.read( Rails.root.join('db', 'seed_create_first.rb') ) )

# sample questions
Stage.all.each do |s| 
  q = Question.new
  q.text = "How do you know the sky is blue?"
  q.answers = '{"1":{"text":"I just do"}, "2":{"text":"Instinct", "correct":"true"}, "3":{"text":"Not Sure"}}'
  s.questions.push(q)
  s.save
end
