# app/models/event.rb
class Event < ApplicationRecord
  validates :name, presence: true
  validates :description, presence: true
  validates :date, presence: true
  validates :location, presence: true
end
