class CreateTable < ActiveRecord::Migration[7.0]
  def change
    create_table :event_users do |t|
      t.bigint :users_id, null: false
      t.bigint :events_id, null: false
      t.timestamps
    end

    add_index :event_users, :events_id
    add_index :event_users, :users_id

    create_table :events do |t|
      t.string :name
      t.text :description
      
      t.datetime :date
      t.string :location
      t.bigint :user_id, null: false
      t.json :participant_ids
      t.timestamps
    end
    
    add_index :events, :user_id

    create_table :posts do |t|
      t.string :title
      t.timestamps
    end

    create_table :users do |t|
      t.string :name
      t.string :email
      t.timestamps
    end

    add_foreign_key :event_users, :events, column: :events_id
    add_foreign_key :event_users, :users, column: :users_id
  end
end