# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# TODO: figure out mass-assignment issue

g = Game.create( { title: 'DH Sim' } )

# n = nil
# path_array =
#   [
#     [1,n,n,n,n],
#     [1,1,1,1,n],
#     [n,n,n,1,1],
#     [n,n,n,n,1],
#     [1,1,1,1,1]
#   ]
# g.path = path_array
# g.save

# g.path.each do |arr|
#   arr.map! do |n|
#     p =  n ? Piece.create 
#     p.title = "yahoo" if n
#     p.game = g # TODO: mass-assignment issue
#     p.save
#     n = p.id 
#   end
# end
# g.save

# TODO: YAML-ify pieces
titles = 
  [
    "White Paper",
    "Marketing Call",
    "Capture Meeting",
    "Proposal Meeting",
    "MSR",
    "Industry Conference",
    "Pitch deck",
    "Meet and greet",
    "White Paper",
    "Marketing Call",
    "Capture Meeting",
    "Proposal Meeting",
    "MSR",
    "Industry Conference",
    "Pitch deck",
    "Meet and greet"
  ]


titles.each { |t| Piece.create( { title: t, caption: "A caption!!!"} ) }

num_pieces = Piece.all.count

Piece.all.each do |p|
  p.next_id = (p.id + 1) # TODO: fix this - make it right
  p.game = g
  p.save
end

# set last piece
p = Piece.all.last
p.next = nil
p.save
