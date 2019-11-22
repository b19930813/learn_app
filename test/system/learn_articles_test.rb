require "application_system_test_case"

class LearnArticlesTest < ApplicationSystemTestCase
  setup do
    @learn_article = learn_articles(:one)
  end

  test "visiting the index" do
    visit learn_articles_url
    assert_selector "h1", text: "Learn Articles"
  end

  test "creating a Learn article" do
    visit learn_articles_url
    click_on "New Learn Article"

    fill_in "Author", with: @learn_article.author
    fill_in "Content", with: @learn_article.content
    check "Is avilable" if @learn_article.is_avilable
    fill_in "Level", with: @learn_article.level
    fill_in "Popular", with: @learn_article.popular
    fill_in "Title", with: @learn_article.title
    click_on "Create Learn article"

    assert_text "Learn article was successfully created"
    click_on "Back"
  end

  test "updating a Learn article" do
    visit learn_articles_url
    click_on "Edit", match: :first

    fill_in "Author", with: @learn_article.author
    fill_in "Content", with: @learn_article.content
    check "Is avilable" if @learn_article.is_avilable
    fill_in "Level", with: @learn_article.level
    fill_in "Popular", with: @learn_article.popular
    fill_in "Title", with: @learn_article.title
    click_on "Update Learn article"

    assert_text "Learn article was successfully updated"
    click_on "Back"
  end

  test "destroying a Learn article" do
    visit learn_articles_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Learn article was successfully destroyed"
  end
end
