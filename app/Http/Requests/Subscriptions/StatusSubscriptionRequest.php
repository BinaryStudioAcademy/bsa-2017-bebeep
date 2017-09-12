<?php

namespace App\Http\Requests\Subscriptions;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;
use App\Services\Requests\Subscriptions\StatusSubscriptionRequest as ContractStatusSubscriptionRequest;

class StatusSubscriptionRequest extends FormRequest implements ContractStatusSubscriptionRequest
{
    public function authorize()
    {
        return Auth::check();
    }

    public function rules()
    {
        return [
            'is_active' => 'required',
        ];
    }

    public function isActive(): bool
    {
        return (bool) $this->get('is_active');
    }
}
