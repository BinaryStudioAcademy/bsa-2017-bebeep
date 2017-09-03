<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateReviewRequest extends FormRequest
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
            'rating' => 'required|integer|min:0|max:5',
            'review' => 'required'
        ];
    }

    /**
     * Get rating
     *
     * @return float
     */
    public function getRating() : float
    {
        return (float) $this->get('rating');
    }

    /**
     * Get Review
     *
     * @return string
     */
    public function getReview() : string
    {
        return $this->get('review');
    }
}
