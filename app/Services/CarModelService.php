<?php

namespace App\Services;

use App\Models\CarBrand;
use App\Repositories\CarModelRepository;
use App\Criteria\Car\Models\ModelByNameCriteria;
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
     * @param $id
     * @return mixed
     */
    public function getModelByMarkId($id)
    {
        return $this->carModelRepository->findWhere(['id_car_mark' => $id]);
    }

    /**
     * @param CarBrand $carBrand
     * @param string $modelName
     */
    public function getModelByCarBrand(CarBrand $carBrand, string $modelName, int $limit = 10)
    {
        $this->carModelRepository->pushCriteria(new ModelByCarBrandCriteria($carBrand, $modelName));

        return $this->carModelRepository->paginate($limit);
    }

    /**
     * @param string $name
     * @param int $limit
     * @return mixed
     */
    public function getByName(string $name, int $limit = 10)
    {
        $this->carModelRepository->pushCriteria(new ModelByNameCriteria($name));

        return $this->carModelRepository->paginate($limit);
    }
}
