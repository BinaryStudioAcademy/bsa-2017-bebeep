<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;
use App\Services\Requests\CreateSubscriptionsRequest as CreateSubscriptionsRequestInterface;

class CreateSubscriptionRequest extends FormRequest implements  CreateSubscriptionsRequestInterface
{
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
        return (array) $this->get('start_point');
    }

    /**
     * @return array
     */
    public function getTo(): array
    {
        return (array) $this->get('end_point');
    }

    /**
     * @return array
     */
    public function getFilters(): array
    {
        return (array) $this->get('filters');
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
}