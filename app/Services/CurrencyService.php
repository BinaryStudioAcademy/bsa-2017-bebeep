<?php

namespace App\Services;

use App\Models\Currency;
use App\Repositories\Contracts\CurrencyRepository;
use App\Services\Contracts\CurrencyService as CurrencyServiceContract;

class CurrencyService implements CurrencyServiceContract
{
    protected $currencyRepository;

    public function __construct(CurrencyRepository $currencyRepository) {
        $this->currencyRepository = $currencyRepository;
    }

    /**
     * {@inheritdoc}
     */
    public function getAll(CriteriaInterface $criteria, int $limit) : LengthAwarePaginator
    {
        $this->bookingRepository->pushCriteria($criteria);
        $result = $this->bookingRepository->paginate($limit);

        return $result;
    }
}
