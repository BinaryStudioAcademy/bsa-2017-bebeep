<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Services\Requests\BookingListRequest as BookingListRequestContract;

class BookingListRequest extends FormRequest implements BookingListRequestContract
{
    const PAGE_LIMIT = 10;

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
        return [];
    }

    /**
     * {@inheritdoc}
     */
    public function getLimit(): int
    {
        return (int) $this->get('limit') ?? self::PAGE_LIMIT;
    }
}
