<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Services\Requests\TokenRequest as TokenRequestContract;

class TokenRequest extends FormRequest implements TokenRequestContract
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
            'token' => 'required',
        ];
    }

    /**
     * @return string
     */
    public function getToken(): string
    {
        return $this->get('token');
    }
}
