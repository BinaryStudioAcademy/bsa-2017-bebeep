<?php

namespace App\Services;

use App\Models\CarBrand;
use App\Repositories\CarModelRepository;
use App\Criteria\Car\Models\ModelByCarBrandCriteria;

class CarModelService
{
    private $carModelRepository;

    /**
     * CarModelService constructor.
     *
     * @param CarModelRepository $carModelRepository
     */
    public function __construct(CarModelRepository $carModelRepository)
    {
        $this->carModelRepository = $carModelRepository;
    }

    /**
     * @param CarBrand $carBrand
     * @param int $limit
     * @return mixed
     */
    public function getModelByBrand(CarBrand $carBrand)
    {
        $this->carModelRepository->pushCriteria(new ModelByCarBrandCriteria($carBrand));

        return $this->carModelRepository->all();
    }
}
