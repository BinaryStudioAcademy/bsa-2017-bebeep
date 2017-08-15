<?php

namespace App\Http\Controllers\Api\Car;

use App\Services\CarBodyService;
use App\Http\Controllers\Controller;

class CarBodyController extends Controller
{
    private $carBodyService;

    /**
     * CarBodyController constructor.
     *
     * @param CarBodyService $carBodyService
     */
    public function __construct(CarBodyService $carBodyService)
    {
        $this->carBodyService = $carBodyService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->carBodyService->getAll();
    }
}
