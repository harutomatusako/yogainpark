class EventsController < ApplicationController
  before_action :set_event, only: %i[ show update destroy ]

  # GET /events
  def index
    @events = Event.includes(:user).all
    render json: @events.as_json(include: [:user], methods: :participants)
  end

  # GET /events/1
  def show
    render json: @event.as_json(include: [:user], methods: :participants)
  end

  # POST /events
  def create
    @event = Event.new(event_params)
  
    @event.participant_ids = params[:event][:participant_ids].map(&:to_i) if params[:event][:participant_ids]

    if @event.save 
      render json: @event, status: :created, location: @event
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /events/1
  def update
    # ここでparticipant_idsを配列として処理
    @event.participant_ids = params[:event][:participant_ids].map(&:to_i) if params[:event][:participant_ids]

    if @event.update(event_params)
      render json: @event
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end


  # DELETE /events/1
  def destroy
    @event.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_event
      @event = Event.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def event_params
      params.require(:event).permit(:name, :description, :date, :location, :user_id, participant_ids: [])
    end
end
