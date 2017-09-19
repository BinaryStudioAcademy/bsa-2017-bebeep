<?php

namespace App\Services\Requests;

interface CurrencyListRequest
{
    /**
     * @return int
     */
    public function getLimit() : int;
}
