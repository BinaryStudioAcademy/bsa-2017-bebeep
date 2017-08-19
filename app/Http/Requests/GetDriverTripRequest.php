<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class GetDriverTripRequest extends FormRequest
{
    public function authorize()
    {
        return $this->route()->parameter('trip')->user_id === Auth::user()->id;
    }

    public function rules()
    {
        return [];
    }
}
