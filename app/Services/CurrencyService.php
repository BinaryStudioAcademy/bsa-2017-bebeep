<?php

namespace App\Services;

use App\Models\Currency;
use Illuminate\Support\Collection;
use App\Repositories\Contracts\CurrencyRepository;
use App\Services\Contracts\CurrencyService as CurrencyServiceContract;

class CurrencyService implements CurrencyServiceContract
{
    /**
     * @var \App\Repositories\Contracts\CurrencyRepository
     */
    protected $currencyRepository;

    /**
     * @param \App\Repositories\Contracts\CurrencyRepository $currencyRepository
     */
    public function __construct(CurrencyRepository $currencyRepository)
    {
        $this->currencyRepository = $currencyRepository;
    }

    /**
     * {@inheritdoc}
     */
    public function getAll(): Collection
    {
        return $this->currencyRepository->all();
    }

    /**
     * {@inheritdoc}
     */
    public function getOne(Currency $currency): ?Currency
    {
        return $currency;
    }
}
