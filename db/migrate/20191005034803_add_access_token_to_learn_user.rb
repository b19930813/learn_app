class AddAccessTokenToLearnUser < ActiveRecord::Migration[5.2]
  def change
    add_column :learn_users, :access_token, :string
  end
end
