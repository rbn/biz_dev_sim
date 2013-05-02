class Game < ActiveRecord::Base
  attr_accessible :title
  has_many :pieces, dependent: :destroy
end
