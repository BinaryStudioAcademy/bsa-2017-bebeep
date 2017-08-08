<?php

namespace App\Http\Requests;

use App\Services\Requests\VerifyUserRequest as VerifyUserRequestInterface;
use Illuminate\Foundation\Http\FormRequest;

class VerifyUserRequest extends FormRequest implements VerifyUserRequestInterface
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
            'email' => 'required|email|exists:users,email',
            'token' => 'required',
        ];
    }

    /**
     * @return string|null
     */
    public function getEmail(): ?string
    {
        return $this->get('email');
    }

    /**
     * @return string|null
     */
    public function getToken(): ?string
    {
        return $this->get('token');
    }
}
