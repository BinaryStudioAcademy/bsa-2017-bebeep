<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;
use App\Services\Requests\UpdateTripRequest as UpdateTripRequestInterface;

class UpdateTripRequest extends FormRequest implements UpdateTripRequestInterface
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'price' => 'required|numeric',
            'seats' => 'required|integer|min:0',
            'start_at' => 'required|integer',
            'end_at' => 'required|integer',
            'from' => 'required|array',
            'to' => 'required|array',
            'waypoints' => 'array',
            'waypoints.*' => 'required_with:waypoints|array',
            'routes' => 'required|array',
            'routes.*.start_at' => 'required|integer',
            'routes.*.end_at' => 'required|integer',
            'vehicle_id' => 'required|integer|exists:vehicles,id',
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function getPrice(): float
    {
        return (float) $this->get('price');
    }

    /**
     * {@inheritdoc}
     */
    public function getSeats(): int
    {
        return (int) $this->get('seats');
    }

    /**
     * {@inheritdoc}
     */
    public function getStartAt(): Carbon
    {
        return Carbon::createFromTimestampUTC($this->get('start_at'));
    }

    /**
     * {@inheritdoc}
     */
    public function getEndAt(): Carbon
    {
        return Carbon::createFromTimestampUTC($this->get('end_at'));
    }

    /**
     * {@inheritdoc}
     */
    public function getVehicleId(): int
    {
        return (int) $this->get('vehicle_id');
    }

    /**
     * {@inheritdoc}
     */
    public function getFrom(): array
    {
        return (array) $this->get('from');
    }

    /**
     * {@inheritdoc}
     */
    public function getTo(): array
    {
        return (array) $this->get('to');
    }

    /**
     * {@inheritdoc}
     */
    public function getWaypoints(): array
    {
        // TODO :: Need to change this code so that
        // this method returns the collection of Waypoints instances

        return (array) $this->get('waypoints');
    }

    /**
     * {@inheritdoc}
     */
    public function getRoutesTime(): array
    {
        // TODO :: Need to change this code so that
        // this method returns the collection of Routes instances

        return (array) $this->get('routes');
    }

    /**
     * {@inheritdoc}
     */
    public function getLuggageSize(): int
    {
        return (int) $this->get('luggage_size');
    }

    /**
     * {@inheritdoc}
     */
    public function getIsAnimalsAllowed(): bool
    {
        return (bool) $this->get('is_animals_allowed');
    }
}
