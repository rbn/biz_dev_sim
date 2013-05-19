require 'spec_helper'

describe "stages/new" do
  before(:each) do
    assign(:stage, stub_model(Stage,
      :title => "MyString",
      :content => "MyString",
      :text => "MyString"
    ).as_new_record)
  end

  it "renders new stage form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => stages_path, :method => "post" do
      assert_select "input#stage_title", :name => "stage[title]"
      assert_select "input#stage_content", :name => "stage[content]"
      assert_select "input#stage_text", :name => "stage[text]"
    end
  end
end
