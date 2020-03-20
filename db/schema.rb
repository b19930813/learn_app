# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_03_17_033227) do

  create_table "articles", force: :cascade do |t|
    t.string "title"
    t.text "content"
    t.integer "browseCount"
    t.integer "likeCount"
    t.integer "learn_user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["learn_user_id"], name: "index_articles_on_learn_user_id"
  end

  create_table "discuss_articles", force: :cascade do |t|
    t.text "content"
    t.integer "article_id", null: false
    t.integer "learn_user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["article_id"], name: "index_discuss_articles_on_article_id"
    t.index ["learn_user_id"], name: "index_discuss_articles_on_learn_user_id"
  end

  create_table "discuss_responses", force: :cascade do |t|
    t.text "content"
    t.integer "response_id", null: false
    t.integer "learn_user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["learn_user_id"], name: "index_discuss_responses_on_learn_user_id"
    t.index ["response_id"], name: "index_discuss_responses_on_response_id"
  end

  create_table "learn_articles", force: :cascade do |t|
    t.string "title"
    t.text "content"
    t.boolean "is_avilable"
    t.string "author"
    t.integer "level"
    t.integer "popular"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "learn_users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "access_token"
    t.index ["email"], name: "index_learn_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_learn_users_on_reset_password_token", unique: true
  end

  create_table "managers", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_managers_on_email", unique: true
    t.index ["reset_password_token"], name: "index_managers_on_reset_password_token", unique: true
  end

  create_table "models", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_models_on_email", unique: true
    t.index ["reset_password_token"], name: "index_models_on_reset_password_token", unique: true
  end

  create_table "my_vocabularies", force: :cascade do |t|
    t.integer "learn_user_id"
    t.integer "vocabulary_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["learn_user_id"], name: "index_my_vocabularies_on_learn_user_id"
    t.index ["vocabulary_id"], name: "index_my_vocabularies_on_vocabulary_id"
  end

  create_table "posts", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "responses", force: :cascade do |t|
    t.text "content"
    t.boolean "is_answer"
    t.integer "article_id"
    t.integer "learn_user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["article_id"], name: "index_responses_on_article_id"
    t.index ["learn_user_id"], name: "index_responses_on_learn_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "vocabularies", force: :cascade do |t|
    t.integer "level"
    t.string "jpVocabulary"
    t.string "katakana"
    t.string "cnVocabulary"
    t.string "jpSentence"
    t.string "cnSentence"
    t.string "pos"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "discuss_articles", "articles"
  add_foreign_key "discuss_articles", "learn_users"
  add_foreign_key "discuss_responses", "learn_users"
  add_foreign_key "discuss_responses", "responses"
  add_foreign_key "my_vocabularies", "learn_users"
  add_foreign_key "my_vocabularies", "vocabularies"
end
