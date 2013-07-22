class Game < ActiveRecord::Base
  serialize :path, Array
  attr_accessible :title, :path
  has_many :pieces, dependent: :destroy
  has_many :game_instances
  has_many :users, :through => :game_instances
end
