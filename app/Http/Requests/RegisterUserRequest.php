<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterUserRequest extends FormRequest
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
            'first_name' => "required|",
            'last_name' => "required|",
            'email' => "required|email|unique:users,email",
            'phone' => "required|digits_between:1,15",
            'password' => "required|confirmed|min:6",
            'role_driver' => "required_if:role_passenger,==,''",
            'role_passenger' => "required_if:role_driver,==,''",
        ];
    }
}
