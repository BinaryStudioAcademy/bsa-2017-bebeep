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
            'price' => 'required',
            'seats' => 'required|integer|min:0|max_seats_from_vehicle:'.$this->get('vehicle_id').','.$this->get('vehicle')['seats'],
            'start_at' => 'required|integer|greater_than_date:'.$minStartAt,
            'end_at' => 'required|integer|greater_than_date:'.$this->get('start_at'),
            'from' => 'required|array',
            'to' => 'required|array',
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
     * @return float
     */
    public function getPrice(): float
    {
        return (float) $this->get('price');
    }

    /**
     * @return int
     */
    public function getSeats(): int
    {
        return (int) $this->get('seats');
    }

    /**
     * @return Carbon
     */
    public function getStartAt(): Carbon
    {
        return Carbon::createFromTimestampUTC($this->get('start_at'));
    }

    /**
     * @return Carbon
     */
    public function getEndAt(): Carbon
    {
        return Carbon::createFromTimestampUTC($this->get('end_at'));
    }

    /**
     * @return int
     */
    public function getVehicleId(): int
    {
        return (int) $this->get('vehicle_id');
    }

    /**
     * @return array
     */
    public function getFrom(): array
    {
        return (array) $this->get('from');
    }

    /**
     * @return array
     */
    public function getTo(): array
    {
        return (array) $this->get('to');
    }

    /**
     * @return array
     */
    public function getWaypoints(): array
    {
        return (array) $this->get('waypoints');
    }

    /**
     * @return array
     */
    public function getVehicle(): array
    {
        return $this->get('vehicle');
    }

    /**
     * @return int
     */
    public function getLuggageSize(): int
    {
        return (int) $this->get('luggage_size');
    }

    /**
     * @return bool
     */
    public function getIsAnimalsAllowed(): bool
    {
        return (bool) $this->get('is_animals_allowed');
    }

    /**
     * @return bool
     */
    public function getIsInBothDirections(): bool
    {
        return (bool) $this->get('is_in_both_directions');
    }

    /**
     * @return Carbon
     */
    public function getReverseStartAt(): Carbon
    {
        return Carbon::createFromTimestampUTC($this->get('reverse_start_at'));
    }
}
