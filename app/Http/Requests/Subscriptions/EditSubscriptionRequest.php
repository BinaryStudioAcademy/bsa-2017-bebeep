<?php

namespace App\Http\Requests\Subscriptions;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;
use \App\Services\Requests\Subscriptions\EditSubscriptionRequest as ContractEditSubscriptionRequest;

class EditSubscriptionRequest extends FormRequest implements ContractEditSubscriptionRequest
{
    public function authorize()
    {
        return Auth::check();
    }

    public function rules()
    {
        return [

        ];
    }
}
