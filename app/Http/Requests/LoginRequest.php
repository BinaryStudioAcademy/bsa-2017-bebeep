<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Services\Requests\LoginRequest as LoginRequestContract;

class LoginRequest extends FormRequest implements LoginRequestContract
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
            'email' => "required|email",
            'password' => "required|min:6",
        ];
    }

    /**
     * @return string
     */
    public function getEmail(): string
    {
        return $this->get('email');
    }

    /**
     * @return string
     */
    public function getPassword(): string
    {
        return $this->get('password');
    }
}
