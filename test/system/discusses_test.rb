require "application_system_test_case"

class DiscussesTest < ApplicationSystemTestCase
  setup do
    @discuss = discusses(:one)
  end

  test "visiting the index" do
    visit discusses_url
    assert_selector "h1", text: "Discusses"
  end

  test "creating a Discuss" do
    visit discusses_url
    click_on "New Discuss"

    fill_in "Content", with: @discuss.content
    fill_in "Learn user", with: @discuss.learn_user
    fill_in "Level", with: @discuss.level
    fill_in "Response", with: @discuss.response
    click_on "Create Discuss"

    assert_text "Discuss was successfully created"
    click_on "Back"
  end

  test "updating a Discuss" do
    visit discusses_url
    click_on "Edit", match: :first

    fill_in "Content", with: @discuss.content
    fill_in "Learn user", with: @discuss.learn_user
    fill_in "Level", with: @discuss.level
    fill_in "Response", with: @discuss.response
    click_on "Update Discuss"

    assert_text "Discuss was successfully updated"
    click_on "Back"
  end

  test "destroying a Discuss" do
    visit discusses_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Discuss was successfully destroyed"
  end
end
