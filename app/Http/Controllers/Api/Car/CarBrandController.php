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

    /**
     * @param string $name
     * @return \Illuminate\Http\JsonResponse
     */
    public function brandsByName($name = '')
    {
        $brands = $this->carBrandService->getByName($name, 100);

        return fractal()->collection($brands, new BrandTransformer())->respond();
    }

    /**
     * @param CarBrand $carBrand
     * @param string $name
     * @return \Illuminate\Http\JsonResponse
     */
    public function brandModelsByName(CarBrand $carBrand, $name = '')
    {
        $models = $this->carModelService->getModelByCarBrand($carBrand, $name, 100);

        return fractal()->collection($models, new ModelTransformer())->respond();
    }

    /**
     * @param string $name
     * @return \Illuminate\Http\JsonResponse
     */
    public function modelsByName($name = '')
    {
        $models = $this->carModelService->getByName($name, 100);

        return fractal()->collection($models, new ModelTransformer())->respond();
    }
}
