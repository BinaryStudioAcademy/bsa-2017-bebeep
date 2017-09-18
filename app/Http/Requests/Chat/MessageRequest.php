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

    /**
     * Get message from request.
     *
     * @return string
     */
    public function getMessage(): string
    {
        return $this->get('message');
    }

    /**
     * Get is read status from request.
     *
     * @return bool|null
     */
    public function getIsRead() : ?bool
    {
        return (bool) $this->get('is_read');
    }
}
