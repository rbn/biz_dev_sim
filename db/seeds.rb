# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

titles = 
  [
    "White Paper",
    "Marketing Call"
  ]

15.times do 
  titles.each { |t| Piece.create( title: t ) }
end

Piece.all.each do |p|
  p.next_id = Random.new.rand(5..25)
  p.save
end
