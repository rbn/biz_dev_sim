require 'spec_helper'

describe "stages/index" do
  before(:each) do
    assign(:stages, [
      stub_model(Stage,
        :title => "Title",
        :content => "Content",
        :text => "Text"
      ),
      stub_model(Stage,
        :title => "Title",
        :content => "Content",
        :text => "Text"
      )
    ])
  end

  it "renders a list of stages" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Title".to_s, :count => 2
    assert_select "tr>td", :text => "Content".to_s, :count => 2
    assert_select "tr>td", :text => "Text".to_s, :count => 2
  end
end
