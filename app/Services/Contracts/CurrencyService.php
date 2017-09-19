<?php

namespace App\Services\Contracts;

use App\Models\Currency;
use App\Services\Requests\CurrencyListRequest;

interface CurrencyService
{
    /**
     * @param \App\Services\Requests\CurrencyListRequest $request
     *
     * @return LengthAwarePaginator
     */
    public function getUpcoming(CurrencyListRequest $request) : Collection;
}
