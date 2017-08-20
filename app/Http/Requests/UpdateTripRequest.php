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
            'price' => 'required',
            'seats' => 'required|integer|min:0',
            'start_at' => 'required|integer',
            'end_at' => 'required|integer',
            'from' => 'required|array',
            'to' => 'required|array',
            'vehicle_id' => 'required|integer|exists:vehicles,id',
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
}
