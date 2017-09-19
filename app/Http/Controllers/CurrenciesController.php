<?php

namespace App\Http\Controllers;

use App\Models\Currency;
use Illuminate\Http\Request;
use App\Services\Contracts\CurrencyService;

class CurrenciesController extends Controller
{
    /**
     * @var \App\Services\Contracts\CurrencyService
     */
    private $currencyService;

    /**
     * @param \App\Services\Contracts\CurrencyService $currencyService
     */
    public function __construct(CurrencyService $currencyService)
    {
        $this->currencyService = $currencyService;
    }

    /**
     * Get all currencies list.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function all()
    {
        $currencies = $this->currencyService->getAll();

        return response()->json($currencies);
    }

    /**
     * Get the currency data.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function one(Currency $currency)
    {
        $currency = $this->currencyService->getOne($currency);

        return response()->json($currency);
    }
}
