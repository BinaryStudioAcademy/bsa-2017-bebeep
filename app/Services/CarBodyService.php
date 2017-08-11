<?php


namespace App\Services;

use App\Repositories\CarBodyRepository;

class CarBodyService
{
    private $carBodyRepository;

    /**
     * CarBodyService constructor.
     *
     * @param CarBodyRepository $carBodyRepository
     */
    public function __construct(CarBodyRepository $carBodyRepository)
    {
        $this->carBodyRepository = $carBodyRepository;
    }

    public function getAll()
    {
        return $this->carBodyRepository->all();
    }
}