class AddParticipantIdsToEvents < ActiveRecord::Migration[7.0]
  def change
    add_column :events, :participant_ids, :json
  end
end
