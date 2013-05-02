class HomeController < ApplicationController
  def index
    @pieces = Piece.all
  end
end
