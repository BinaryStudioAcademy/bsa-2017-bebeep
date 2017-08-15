<?php

namespace App\Http\Requests;

use App\User;
use Illuminate\Foundation\Http\FormRequest;
use App\Services\Requests\UpdateUserProfileRequest as UpdateUserProfileRequestInterface;

class UpdateUserProfileRequest extends FormRequest implements UpdateUserProfileRequestInterface
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
            'email' => 'required|email|exists:users,email',
            'phone' => 'required|digits_between:1,15',
            'birth_date' => 'required|date',
            'about_me' => 'max:500',
            'role_driver' => 'required_without:role_passenger|role_can_uncheck:driver',
            'role_passenger' => 'required_without:role_driver|role_can_uncheck:passenger',
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
    public function getBirthDate(): string
    {
        return $this->get('birth_date');
    }

    /**
     * @return string|null
     */
    public function getAboutMe(): ?string
    {
        return $this->get('about_me');
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
