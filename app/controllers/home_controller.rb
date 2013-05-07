class HomeController < ApplicationController
  def index
  end

  def boxes
    @game = Game.all.first
    @pieces = @game.pieces
  end

  def data
    p = Piece.all
    render json: p.to_json(include: :next)
  end
end
