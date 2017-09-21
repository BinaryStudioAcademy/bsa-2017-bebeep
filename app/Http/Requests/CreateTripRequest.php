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
    private $startAt;
    private $endAt;
    private $reverseStartAt;

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
            'currency_id' => 'required|integer|exists:currencies,id',
            'seats' => 'required|integer|min:0|max_seats_from_vehicle:'.$this->get('vehicle_id').','.$this->get('vehicle')['seats'],
            'start_at' => 'required|integer|greater_than_date:'.$minStartAt,
            'end_at' => 'required|integer|greater_than_date:'.$this->get('start_at'),
            'from' => 'required|array',
            'to' => 'required|array',
            'waypoints' => 'array',
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
            'recurring_count' => 'integer|max:20|min:1',
            'recurring_period' => 'integer|max:60|min:1',
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
     * @return int|null
     */
    public function getCurrencyId(): ?int
    {
        return (int) $this->get('currency_id');
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
        if ($this->startAt) {
            return $this->startAt;
        }

        return Carbon::createFromTimestampUTC($this->get('start_at'));
    }

    /**
     * {@inheritdoc}
     */
    public function getEndAt(): Carbon
    {
        if ($this->endAt) {
            return $this->endAt;
        }

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
        if ($this->reverseStartAt) {
            return $this->reverseStartAt;
        }

        return Carbon::createFromTimestampUTC($this->get('reverse_start_at'));
    }

    public function getRecurringCount(): int
    {
        return (int) $this->get('recurring_count');
    }

    public function getRecurringPeriod(): int
    {
        return (int) $this->get('recurring_period');
    }

    public function setReverseStartAt(Carbon $date): Carbon
    {
        $this->reverseStartAt = $date;

        return $date;
    }

    public function setStartAt(Carbon $date): Carbon
    {
        $this->startAt = $date;

        return $date;
    }

    public function setEndAt(Carbon $date): Carbon
    {
        $this->endAt = $date;

        return $date;
    }
}
