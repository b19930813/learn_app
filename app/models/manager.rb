class Manager < ApplicationRecord
  extend Devise::Models
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  # devise :database_authenticatable, :registerable,
  #        :recoverable, :rememberable, :validatable

  #關閉註冊功能
  devise :database_authenticatable, 
  :recoverable, :rememberable, :validatable
end
