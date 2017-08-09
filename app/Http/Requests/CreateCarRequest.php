<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Services\Requests\CreateCarRequest as CreateCarRequestInterface;

class CreateCarRequest extends FormRequest implements CreateCarRequestInterface
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
            'brand' => "required",
            'model' => "required",
            'color' => "required",
            'body' => "required",
            'seats' => "required",
            'year' => "required",
        ];
    }

    public function getBrand(): string
    {
        return $this->get('brand');
    }

    public function getModel(): string
    {
        return $this->get('model');
    }

    public function getColor(): string
    {
        return $this->get('color');
    }

    public function getBody(): string
    {
        return $this->get('body');
    }

    public function getSeats(): int
    {
        return $this->get('seats');
    }

    public function getYear(): int
    {
        return $this->get('year');
    }


}