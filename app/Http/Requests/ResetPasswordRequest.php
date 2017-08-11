<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use \App\Services\Requests\ResetPasswordRequest as ResetPasswordRequestInterface;

class ResetPasswordRequest extends FormRequest implements ResetPasswordRequestInterface
{

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'email' => "required|email",
            'token' => "required",
            'password' => "required|confirmed|min:6",
        ];
    }

    public function getEmail()
    {
        return $this->get('email');
    }

    public function getToken()
    {
        return $this->get('token');
    }

    public function getPass()
    {
        return $this->get('password');
    }

    public function getPasswordConfirmation()
    {
        return $this->get('password_confirmation');
    }

}