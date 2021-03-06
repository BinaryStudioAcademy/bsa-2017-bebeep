<?php

namespace App\Http\Requests\Chat;

use Illuminate\Foundation\Http\FormRequest;
use App\Services\Requests\Chat\UsersSearchRequest as UsersSearchRequestContract;

class UsersSearchRequest extends FormRequest implements UsersSearchRequestContract
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
            'filter' => 'array',
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function isSearchFilterExists(): bool
    {
        return $this->has('filter');
    }

    /**
     * {@inheritdoc}
     */
    public function getEmail(): string
    {
        return $this->get('filter')['email'] ?? '';
    }

    /**
     * {@inheritdoc}
     */
    public function getFirstName(): string
    {
        return $this->get('filter')['first_name'] ?? '';
    }

    /**
     * {@inheritdoc}
     */
    public function getLastName(): string
    {
        return $this->get('filter')['last_name'] ?? '';
    }

    public function areNamesParamsIdentical(): bool
    {
        return $this->getFirstName() === $this->getLastName();
    }
}
