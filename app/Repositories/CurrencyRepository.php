<?php

namespace App\Repositories;

use App\Models\Currency;
use Prettus\Repository\Eloquent\BaseRepository;

class CurrencyRepository extends BaseRepository implements Contracts\CurrencyRepository
{
    /**
     * @return string
     */
    public function model()
    {
        return Currency::class;
    }

    /**
     * {@inheritdoc}
     */
    public function save(Currency $currency)
    {
        $currency->push();

        return $currency;
    }

    /**
     * {@inheritdoc}
     */
    public function updateCurrency(Currency $currency, int $id): Currency
    {
        return $this->update($currency->toArray(), $id);
    }
}
