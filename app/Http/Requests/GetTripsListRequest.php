<?php

namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;

use App\Services\Requests\GetTripsListRequest as InterfaceGetTripsListRequest;

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

    public function rules()
    {
        return [];
    }
}