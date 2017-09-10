<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use App\Models\Trip;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;
use App\Services\Requests\CreateTripRequest as CreateTripRequestInterface;

class CreateTripRequest extends FormRequest implements CreateTripRequestInterface
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
        $minStartAt = Carbon::now()->addSeconds(Trip::MIN_DELAY_TO_START_DATE)->timestamp;

        return [
            'price' => 'required|numeric',
            'seats' => 'required|integer|min:0|max_seats_from_vehicle:'.$this->get('vehicle_id').','.$this->get('vehicle')['seats'],
            'start_at' => 'required|integer|greater_than_date:'.$minStartAt,
            'end_at' => 'required|integer|greater_than_date:'.$this->get('start_at'),
            'from' => 'required|array',
            'to' => 'required|array',
            'waypoints' => 'array',
            'waypoints.*' => 'required_with:waypoints|array',
            'routes' => 'required|array',
            'routes.*.start_at' => 'required|integer',
            'routes.*.end_at' => 'required|integer',
            'vehicle_id' => [
                'required_without:vehicle',
                'integer',
                Rule::exists('vehicles', 'id')->where(function ($query) {
                    $query->where([
                        'user_id' => Auth::user()->id,
                    ]);
                }),
            ],
            'vehicle' => 'required_without:vehicle_id',
            'reverse_start_at' => ['required_if:is_in_both_directions,true', 'greater_than_date_if:is_in_both_directions,'.$this->get('end_at')],
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
    public function getVehicle(): array
    {
        return $this->get('vehicle');
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

    /**
     * {@inheritdoc}
     */
    public function getIsInBothDirections(): bool
    {
        return (bool) $this->get('is_in_both_directions');
    }

    /**
     * {@inheritdoc}
     */
    public function getReverseStartAt(): Carbon
    {
        return Carbon::createFromTimestampUTC($this->get('reverse_start_at'));
    }
}
