require 'test_helper'

class DiscussesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @discuss = discusses(:one)
  end

  test "should get index" do
    get discusses_url
    assert_response :success
  end

  test "should get new" do
    get new_discuss_url
    assert_response :success
  end

  test "should create discuss" do
    assert_difference('Discuss.count') do
      post discusses_url, params: { discuss: { content: @discuss.content, learn_user: @discuss.learn_user, level: @discuss.level, response: @discuss.response } }
    end

    assert_redirected_to discuss_url(Discuss.last)
  end

  test "should show discuss" do
    get discuss_url(@discuss)
    assert_response :success
  end

  test "should get edit" do
    get edit_discuss_url(@discuss)
    assert_response :success
  end

  test "should update discuss" do
    patch discuss_url(@discuss), params: { discuss: { content: @discuss.content, learn_user: @discuss.learn_user, level: @discuss.level, response: @discuss.response } }
    assert_redirected_to discuss_url(@discuss)
  end

  test "should destroy discuss" do
    assert_difference('Discuss.count', -1) do
      delete discuss_url(@discuss)
    end

    assert_redirected_to discusses_url
  end
end
