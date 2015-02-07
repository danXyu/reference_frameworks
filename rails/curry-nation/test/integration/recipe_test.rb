require 'test_helper'

curry = recipes(:curry)
get "/recipes/new"

assert_response :success
post_via_redirect "/recipes/new", title: recipes(:curry).title