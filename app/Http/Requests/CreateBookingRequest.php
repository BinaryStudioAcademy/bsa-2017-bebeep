<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;
use App\Services\Requests\CreateBookingRequest as CreateBookingRequestContract;

class CreateBookingRequest extends FormRequest implements CreateBookingRequestContract
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $trip = $this->route()->parameter('trip');

        if ($trip->user_id === Auth::user()->id) {
            return false;
        }

        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $trip = $this->route()->parameter('trip');

        return [
            'routes' => [
                'required',
                'array',
                'routes_exists_for_trip:'.$trip->routes->implode('id', ','),
            ],
            'seats' => 'required|integer|min:0|max_seats_from_vehicle:'.$trip->vehicle->id,
        ];
    }

    /**
     * @return int
     */
    public function getSeats(): int
    {
        return (int) $this->get('seats');
    }

    /**
     * @return array
     */
    public function getRoutes(): array
    {
        return (array) $this->get('routes');
    }
}
