<?php

namespace App\Http\Requests;

use App\User;
use Illuminate\Foundation\Http\FormRequest;
use App\Services\Requests\RegisterUserRequest as RegisterUserRequestInterface;

class RegisterUserRequest extends FormRequest implements RegisterUserRequestInterface
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
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email|unique:users,email',
            'phone' => 'required|digits_between:1,15',
            'birth_date' => 'nullable|date',
            'password' => 'required|confirmed|min:6',
            'role_driver' => 'required_without:role_passenger',
            'role_passenger' => 'required_without:role_driver',
        ];
    }

    /**
     * @return string
     */
    public function getFirstName(): string
    {
        return $this->get('first_name');
    }

    /**
     * @return string
     */
    public function getLastName(): string
    {
        return $this->get('last_name');
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
    public function getPhone(): string
    {
        return $this->get('phone');
    }

    /**
     * @return string
     */
    public function getBirthDate(): ?string
    {
        return $this->get('birth_date');
    }

    /**
     * @return string
     */
    public function getPass(): string
    {
        return $this->get('password');
    }

    /**
     * @return int
     */
    public function getPermissions(): int
    {
        $permissions = 0;

        if ($this->get('role_passenger')) {
            $permissions |= User::PASSENGER_PERMISSION;
        }

        if ($this->get('role_driver')) {
            $permissions |= User::DRIVER_PERMISSION;
        }

        if (! $permissions) {
            $permissions = User::PASSENGER_PERMISSION;
        }

        return $permissions;
    }
}
