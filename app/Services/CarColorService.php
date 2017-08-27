<?php

namespace App\Services;

use App\Repositories\CarColorRepository;

class CarColorService
{
    private $carColorRepository;

    /**
     * CarColorService constructor.
     *
     * @param CarColorRepository $carColorRepository
     */
    public function __construct(CarColorRepository $carColorRepository)
    {
        $this->carColorRepository = $carColorRepository;
    }

    /**
     * @return mixed
     */
    public function getAll()
    {
        return $this->carColorRepository->all();
    }
}
