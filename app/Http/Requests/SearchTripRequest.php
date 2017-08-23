<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use App\Models\Trip;
use Illuminate\Support\Str;
use Illuminate\Foundation\Http\FormRequest;
use App\Services\Requests\SearchTripRequest as SearchTripRequestInterface;

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
        //$minStartAt = Carbon::now()->timestamp;

        return [
            'fc' => 'required|string',
            'tc' => 'required|string',
            //'start_at' => 'required|integer|greater_than_date:' . $minStartAt,
            'start_at' => 'required|integer',
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function getFromLat() : float
    {
        $lat = explode('|', $this->get('fc'))[1];

        return $lat;
    }

    /**
     * {@inheritdoc}
     */
    public function getFromLng() : float
    {
        $lng = explode('|', $this->get('fc'))[0];

        return $lng;
    }

    /**
     * {@inheritdoc}
     */
    public function getToLat() : float
    {
        $lat = explode('|', $this->get('tc'))[1];

        return $lat;
    }

    /**
     * {@inheritdoc}
     */
    public function getToLng() : float
    {
        $lng = explode('|', $this->get('tc'))[0];

        return $lng;
    }

    /**
     * {@inheritdoc}
     */
    public function getStartAt() : Carbon
    {
        $startAt = $this->get('start_at');
        // For testing
        //$startAt = Carbon::createFromFormat('Y-m-d', '2017-08-23')->toDateString();
        return Carbon::createFromTimestampUTC($startAt)
            ->hour(0)
            ->minute(0)
            ->second(0);
    }

    /**
     * {@inheritdoc}
     */
    public function getLimit() : int
    {
        return (int) ($this->get('limit') ?? self::DEFAULT_PAGE_LIMIT);
    }

    /**
     * {@inheritdoc}
     */
    public function getPage() : int
    {
        $page = (int) $this->get('page');

        return  $page > 0 ? $page : 1;
    }

    /**
     * {@inheritdoc}
     */
    public function getSort() : string
    {
        return $this->get('sort') ?? self::DEFAULT_SORT_FIELD;
    }

    /**
     * {@inheritdoc}
     */
    public function getOrder() : string
    {
        $order = Str::lower($this->get('order'));

        return $order === 'asc' || $order === 'desc' ? $order : self::DEFAULT_SORT_ORDER;
    }

    /**
     * {@inheritdoc}
     */
    public function isAsc() : bool
    {
        return $this->getOrder() === 'asc';
    }

    /**
     * {@inheritdoc}
     */
    public function isDesc() : bool
    {
        return $this->getOrder() === 'desc';
    }

    /**
     * {@inheritdoc}
     */
    public function getFilter() : array
    {
        return $this->get('filter');
    }
}
