<?php

namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;

use App\Http\Requests\Contracts\GetTripsListRequest as InterfaceGetTripsListRequest;

class GetTripsListRequest extends FormRequest implements InterfaceGetTripsListRequest
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
            'user_id' => 'required|integer'
        ];
    }

    /** @inheritdoc */
    public function getUserId():int
    {
        return (int)$this->get('user_id');
    }
}