class Game < ActiveRecord::Base
  serialize :path, Array
  attr_accessible :title, :path
  has_many :pieces, dependent: :destroy
end
