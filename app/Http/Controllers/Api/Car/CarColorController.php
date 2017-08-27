<?php

namespace App\Http\Controllers\Api\Car;

use App\Services\CarColorService;
use App\Http\Controllers\Controller;

class CarColorController extends Controller
{
    private $carColorService;

    /**
     * CarColorController constructor.
     *
     * @param CarColorService $carColorService
     */
    public function __construct(CarColorService $carColorService)
    {
        $this->carColorService = $carColorService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->carColorService->getAll();
    }
}
