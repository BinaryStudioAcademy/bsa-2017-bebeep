<?php

namespace App\Http\Requests;

use Auth;
use App\User;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use App\Services\Requests\UpdateUserAvatarRequest as UpdateUserAvatarRequestInterface;

class UpdateUserAvatarRequest extends FormRequest implements UpdateUserAvatarRequestInterface
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'avatar' => 'required|string',
        ];
    }

    /**
     * @return string
     */
    public function getAvatar(): string
    {
        return $this->get('avatar');
    }
}
