<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use App\Http\Requests\DTO\FilterDTO;
use Illuminate\Foundation\Http\FormRequest;
use App\Services\Requests\CreateSubscriptionsRequest as CreateSubscriptionsRequestInterface;

class CreateSubscriptionRequest extends FormRequest implements CreateSubscriptionsRequestInterface
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
            'start_point' => 'required|array',
            'end_point' => 'required|array',
            'filters' => 'required|array',
            'start_at' => 'required|integer',
            'email' => 'required|email',
        ];
    }

    /**
     * @return array
     */
    public function getFrom(): array
    {
        return (array) $this->get('start_point')['from'];
    }

    /**
     * @return array
     */
    public function getTo(): array
    {
        return (array) $this->get('end_point')['to'];
    }

    /**
     * @return array
     */
    public function getFilters(): array
    {
        $filters = [];

        foreach ($this->get('filters') as $name => $parameters) {
            $filters[] = new FilterDTO($name, json_encode($parameters));
        }

        return $filters;
    }

    /**
     * @return Carbon
     */
    public function getStartAt(): Carbon
    {
        return Carbon::createFromTimestampUTC($this->get('start_at'));
    }

    /**
     * @return string
     */
    public function getEmail(): string
    {
        return $this->get('email');
    }

    /**
     * @return float
     */
    public function getFromLat(): float
    {
        return $this->get('start_point')['from_lat'];
    }

    /**
     * @return float
     */
    public function getFromLng(): float
    {
        return $this->get('start_point')['from_lng'];
    }

    /**
     * @return float
     */
    public function getToLat(): float
    {
        return $this->get('end_point')['to_lat'];
    }

    /**
     * @return float
     */
    public function getToLng(): float
    {
        return $this->get('end_point')['to_lng'];
    }
}