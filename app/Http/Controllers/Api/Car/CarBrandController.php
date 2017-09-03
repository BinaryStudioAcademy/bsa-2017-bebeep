<?php

namespace App\Http\Controllers\Api\Car;

use App\Models\CarBrand;
use App\Services\CarBrandService;
use App\Services\CarModelService;
use App\Http\Controllers\Controller;
use App\Transformers\Car\Brands\BrandTransformer;
use App\Transformers\Car\Models\ModelTransformer;

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
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $brands = $this->carBrandService->getAll();

        return fractal()->collection($brands, new BrandTransformer())->respond();
    }

    /**
     * @param CarBrand $carBrand
     * @return \Illuminate\Http\JsonResponse
     */
    public function getModelByBrand(CarBrand $carBrand)
    {
        $models = $this->carModelService->getModelByBrand($carBrand);

        return fractal()->collection($models, new ModelTransformer())->respond();
    }
}
