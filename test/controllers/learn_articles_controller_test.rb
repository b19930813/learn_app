require 'test_helper'

class LearnArticlesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @learn_article = learn_articles(:one)
  end

  test "should get index" do
    get learn_articles_url
    assert_response :success
  end

  test "should get new" do
    get new_learn_article_url
    assert_response :success
  end

  test "should create learn_article" do
    assert_difference('LearnArticle.count') do
      post learn_articles_url, params: { learn_article: { author: @learn_article.author, content: @learn_article.content, is_avilable: @learn_article.is_avilable, level: @learn_article.level, popular: @learn_article.popular, title: @learn_article.title } }
    end

    assert_redirected_to learn_article_url(LearnArticle.last)
  end

  test "should show learn_article" do
    get learn_article_url(@learn_article)
    assert_response :success
  end

  test "should get edit" do
    get edit_learn_article_url(@learn_article)
    assert_response :success
  end

  test "should update learn_article" do
    patch learn_article_url(@learn_article), params: { learn_article: { author: @learn_article.author, content: @learn_article.content, is_avilable: @learn_article.is_avilable, level: @learn_article.level, popular: @learn_article.popular, title: @learn_article.title } }
    assert_redirected_to learn_article_url(@learn_article)
  end

  test "should destroy learn_article" do
    assert_difference('LearnArticle.count', -1) do
      delete learn_article_url(@learn_article)
    end

    assert_redirected_to learn_articles_url
  end
end
