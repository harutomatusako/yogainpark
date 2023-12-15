# app/models/user.rb
class User < ApplicationRecord
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  # validates :password, presence: true, confirmation: true

  # パスワードのハッシュ化などの処理が必要であれば、以下のように追加
  # has_secure_password
  has_many :events
  has_many :event_users
  has_many :events, through: :event_users
end
