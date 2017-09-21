<?php

namespace App\Repositories\Contracts;

use App\Models\Currency;
use Prettus\Repository\Contracts\RepositoryInterface;
use Prettus\Repository\Contracts\RepositoryCriteriaInterface;

interface CurrencyRepository extends RepositoryInterface, RepositoryCriteriaInterface
{
    /**
     * @param \App\Models\Currency $currency
     *
     * @return \App\Models\Currency
     */
    public function save(Currency $currency);

    /**
     * Update the currency data.
     *
     * @param \App\Models\Currency $currency
     * @param int $id
     *
     * @return \App\Models\Currency
     */
    public function updateCurrency(Currency $currency, int $id): Currency;
}
