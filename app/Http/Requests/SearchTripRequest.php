<?php

namespace App\Http\Requests;

use Carbon\Carbon;
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
        return [
            'fc' => 'required|string',
            'tc' => 'required|string',
            'start_at' => 'integer',
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
        if ($startAt) {
            return Carbon::createFromTimestampUTC($startAt);
        } else {
            return Carbon::today();
        }
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
        return $this->get('filter') ?? [];
    }

    /**
     * {@inheritdoc}
     */
    public function getMinTime(): int
    {
        if (isset($this->getFilter()['time'])) {
            return (int) $this->getFilter()['time']['min'] ?? 1;
        } else {
            return 1;
        }
    }

    /**
     * {@inheritdoc}
     */
    public function getMaxTime(): int
    {
        if (isset($this->getFilter()['time'])) {
            return (int) $this->getFilter()['time']['max'] ?? 24;
        } else {
            return 24;
        }
    }

    /**
     * {@inheritdoc}
     */
    public function getMinPrice(): int
    {
        if (isset($this->getFilter()['price'])) {
            return (int) $this->getFilter()['price']['min'] ?? 1;
        } else {
            return 0;
        }
    }

    /**
     * {@inheritdoc}
     */
    public function getMaxPrice(): int
    {
        if (isset($this->getFilter()['price'])) {
            return (int) $this->getFilter()['price']['max'] ?? 1;
        } else {
            return 0;
        }
    }

    /**
     * @return bool|null
     */
    public function getIsAnimalsAllowed() : ?bool
    {
        return $this->getFilterParam('animals', 'bool');
    }

    /**
     * @return int|null
     */
    public function getLuggageSize() : ?int
    {
        return $this->getFilterParam('luggage', 'int');
    }

    /**
     * @return int|null
     */
    public function getSeats() : ?int
    {
        return $this->getFilterParam('seats', 'int');
    }

    /**
     * @return int|null
     */
    public function getRating() : ?int
    {
        return $this->getFilterParam('rating', 'int');
    }

    /**
     * @return int|null
     */
    public function getTransfers() : ?int
    {
        return $this->getFilterParam('transfers', 'int');
    }

    /**
     * @param string $param
     * @param string $cast
     * @return mixed|null
     */
    private function getFilterParam(string $param, string $cast = 'string')
    {
        $filter = $this->getFilter();

        if (!isset($filter[$param])) {
            return null;
        }

        $value = $filter[$param];
        settype($value, $cast);

        return $value;
    }
}
