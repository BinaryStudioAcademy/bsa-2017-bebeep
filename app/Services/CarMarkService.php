<?php


namespace App\Services;

use App\Repositories\CarMarkRepository;

class CarMarkService
{
    private $carMarkRepository;

    /**
     * CarMarkService constructor.
     *
     * @param CarMarkRepository $carMarkRepository
     */
    public function __construct(CarMarkRepository $carMarkRepository)
    {
        $this->carMarkRepository = $carMarkRepository;
    }

    /**
     * @return mixed
     */
    public function getAll()
    {
        return $this->carMarkRepository->all();
    }
}