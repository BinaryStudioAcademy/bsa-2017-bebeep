<?php

namespace App\Http\Controllers\Api\Car;

use App\Models\CarBrand;
use App\Services\CarBrandService;
use App\Services\CarModelService;
use App\Http\Controllers\Controller;

class CarBrandController extends Controller
{
    private $carBrandService;
    private $carModelService;

    /**
     * CarBrandController constructor.
     *
     * @param CarBrandService $carBrandService
     * @param CarModelService $carModelService
     */
    public function __construct(CarBrandService $carBrandService,
                                CarModelService $carModelService)
    {
        $this->carBrandService = $carBrandService;
        $this->carModelService = $carModelService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->carBrandService->getAll();
    }

    /**
     * @param $id
     * @return mixed
     */
    public function getModelByMarkId($id)
    {
        if ($this->carModelService->getModelByMarkId($id)->count() !== 0) {
            return $this->carModelService->getModelByMarkId($id);
        } else {
            return response()->json('Not found', 404);
        }
    }

    public function brandsByName($name = '')
    {
        $brands = $this->carBrandService->getByName($name, 100);

        return response()->json($brands);
    }

    public function brandModelsByName(CarBrand $carBrand, $name = '')
    {
        $models = $this->carModelService->getModelByCarBrand($carBrand, $name, 100);

        return response()->json($models);
    }

    public function modelsByName($name = '')
    {
        $models = $this->carModelService->getByName($name, 100);

        return response()->json($models);
    }
}
