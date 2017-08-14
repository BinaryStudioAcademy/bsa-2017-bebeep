<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Services\Requests\SearchTripRequest as SearchTripRequestInterface;
use Illuminate\Support\Str;

class SearchTripRequest extends FormRequest implements SearchTripRequestInterface
{
    const DEFAULT_PAGE_LIMIT = 10;
    const DEFAULT_SORT_FIELD = 'price';
    const DEFAULT_SORT_ORDER = 'asc';

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
    public function getFromLng(): string
    {
        $lng = explode('|', $this->get('fc'))[0];
        return $this->get($lng);
    }

    /**
     * {@inheritdoc}
     */
    public function getFromLat(): string
    {
        $lat = explode('|', $this->get('fc'))[1];
        return $this->get($lat);
    }

    /**
     * {@inheritdoc}
     */
    public function getToLng()
    {
        $lng = explode('|', $this->get('tc'))[0];
        return $this->get($lng);
    }

    /**
     * {@inheritdoc}
     */
    public function getToLat()
    {
        $lat = explode('|', $this->get('tc'))[1];
        return $this->get($lat);
    }

    /**
     * {@inheritdoc}
     */
    public function getTime(): int
    {
        return(int) $this->get('start');
    }

    /**
     * {@inheritdoc}
     */
    public function getLimit(): int
    {
        return (int) ($this->get('limit') ?? self::DEFAULT_PAGE_LIMIT);
    }

    /**
     * {@inheritdoc}
     */
    public function getPage(): int
    {
        $page = (int) $this->get('page');
        return  $page > 0 ? $page : 1;
    }

    /**
     * {@inheritdoc}
     */
    public function getSort(): string
    {
        return $this->get('sort') ?? self::DEFAULT_SORT_FIELD;
    }

    /**
     * {@inheritdoc}
     */
    public function getOrder() : string
    {
        $order = Str::lower($this->get('order'));
        return ($order === 'asc' || $order === 'desc' ? $order : self::DEFAULT_SORT_ORDER);
    }

    /**
     * {@inheritdoc}
     */
    public function isAsc(): bool
    {
        return $this->getOrder() === 'asc';
    }

    /**
     * {@inheritdoc}
     */
    public function isDesc(): bool
    {
        return $this->getOrder() === 'desc';
    }


}
