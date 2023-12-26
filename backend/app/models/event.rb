# app/models/event.rb
class Event < ApplicationRecord
  validates :name, presence: true
  validates :description, presence: true
  validates :date, presence: true
  validates :location, presence: true
  belongs_to :user
  has_many :event_users
  has_many :users, through: :event_users

  def participants
    User.find(participant_ids)
  end
end