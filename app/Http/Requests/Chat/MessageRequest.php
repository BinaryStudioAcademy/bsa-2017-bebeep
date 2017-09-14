<?php

namespace App\Http\Requests\Chat;

use Illuminate\Foundation\Http\FormRequest;
use App\Services\Requests\Chat\MessageRequest as MessageRequestContract;

class MessageRequest extends FormRequest implements MessageRequestContract
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
            'message' => 'required|string',
        ];
    }

    public function getMessage(): string
    {
        return $this->get('message');
    }
}
