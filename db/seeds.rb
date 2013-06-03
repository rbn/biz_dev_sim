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


# TODO: YAML-ify pieces
titles = 
  [
    "White Paper",
    "Marketing Call (db)",
    "Capture Meeting",
    "Proposal Meeting",
    "MSR",
    "Industry Conference",
    "Pitch deck",
    "Meet and greet",
    "White Paper",
    "Marketing Call (db)",
    "Capture Meeting",
    "Proposal Meeting",
    "MSR",
    "Industry Conference",
    "Pitch deck",
    "Meet and greet"
  ]


# remove all stages
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

Stage.all.each do |s|
  s.nexts = [ s.id + 1 ] 
  s.nexts.push(4) if s.id == 1
  s.nexts.push(10) if s.id == 5
  s.save
end

eval( IO.read( Rails.root.join('db', 'seed_create_first.rb') ) )
