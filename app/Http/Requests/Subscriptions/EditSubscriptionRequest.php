<?php

namespace App\Http\Requests\Subscriptions;

use App\Http\Requests\DTO\FilterDTO;
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
            'filters' => 'required|array',
        ];
    }

    /**
     * @return array
     */
    public function getFilters(): array
    {
        $filters = [];

        foreach ($this->get('filters') as $id => $filter) {
            $filters[$id] = new FilterDTO($filter['name'], $filter['parameters']);
        }

        return $filters;
    }
}
