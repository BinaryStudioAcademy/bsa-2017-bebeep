<?php

namespace App\Http\Requests;

use App\User;
use Illuminate\Foundation\Http\FormRequest;
use App\Services\Requests\UpdatePasswordRequest as UpdatePasswordRequestInterface;

class UpdatePasswordRequest extends FormRequest implements UpdatePasswordRequestInterface
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
            'current_password' => 'required|is_password_current',
            'password' => 'required|different:current_password|confirmed|min:6',
        ];
    }

    /**
     * @return string
     */
    public function getPassword(): string
    {
        return $this->get('password');
    }
}
