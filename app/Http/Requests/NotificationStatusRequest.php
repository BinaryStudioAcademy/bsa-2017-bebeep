<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Services\Requests\Notifications\StatusRequest;

class NotificationStatusRequest extends FormRequest implements StatusRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'status' => 'required',
        ];
    }

    /**
     * @inheritDoc
     */
    public function isRead(): bool
    {
        return $this->get('status') === 'read';
    }
}
