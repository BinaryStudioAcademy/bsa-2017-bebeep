<?php

namespace App\Services;

use App\Repositories\CarModelRepository;

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
}
