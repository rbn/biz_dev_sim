class Piece < ActiveRecord::Base
  attr_accessible :caption, :title
  has_many :prevs, class_name: "Piece", :foreign_key => "next_id"
  belongs_to :next, class_name: "Piece"
  belongs_to :game

  def blank?
    title
  end

end

