<?php

namespace App\Services;

use App\Repositories\CarBrandRepository;

class CarBrandService
{
    private $carBrandRepository;

    /**
     * CarBrandService constructor.
     *
     * @param CarBrandRepository $carBrandRepository
     */
    public function __construct(CarBrandRepository $carBrandRepository)
    {
        $this->carBrandRepository = $carBrandRepository;
    }

    /**
     * @return mixed
     */
    public function getAll()
    {
        return $this->carBrandRepository->all();
    }
}
