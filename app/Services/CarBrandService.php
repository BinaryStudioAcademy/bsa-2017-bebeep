<?php

namespace App\Services;

use App\Repositories\CarBrandRepository;
use App\Criteria\Car\Brands\BrandByNameCriteria;

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

    /**
     * @param string $name
     * @param int $limit
     * @return mixed
     */
    public function getByName(string $name, int $limit = 10)
    {
        $this->carBrandRepository->pushCriteria(new BrandByNameCriteria($name));

        return $this->carBrandRepository->paginate($limit);
    }
}
