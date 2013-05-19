require 'spec_helper'

describe "stages/show" do
  before(:each) do
    @stage = assign(:stage, stub_model(Stage,
      :title => "Title",
      :content => "Content",
      :text => "Text"
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Title/)
    rendered.should match(/Content/)
    rendered.should match(/Text/)
  end
end
