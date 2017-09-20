<?php

namespace App\Services\Contracts;

use App\Models\Currency;
use Illuminate\Support\Collection;

interface CurrencyService
{
    /**
     * Get all currencies list.
     *
     * @return \Illuminate\Support\Collection
     */
    public function getAll(): Collection;

    /**
     * Get the currency one.
     *
     * @return \App\Models\Currency|null
     */
    public function getOne(Currency $currency): ?Currency;
}
