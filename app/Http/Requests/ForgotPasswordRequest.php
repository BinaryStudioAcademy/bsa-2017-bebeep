<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use \App\Services\Requests\ForgotPasswordRequest as ForgotPasswordRequestInterface;
use Illuminate\Http\Request;

class ForgotPasswordRequest extends FormRequest implements ForgotPasswordRequestInterface
{

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'email' => "required|email|exists:users,email",
        ];
    }

    public function getEmail()
    {
        return $this->get('email');
    }
}