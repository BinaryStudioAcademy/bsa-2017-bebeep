<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Services\Requests\ResetPasswordRequest as ResetPasswordRequestInterface;

class ResetPasswordRequest extends FormRequest implements ResetPasswordRequestInterface
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [];
    }

    public function getEmail()
    {
        return $this->get('email');
    }

    public function getToken()
    {
        return $this->header('Token');
    }

    public function getPass()
    {
        return $this->get('password');
    }

    public function getPasswordConfirmation()
    {
        return $this->get('password');
    }
}
