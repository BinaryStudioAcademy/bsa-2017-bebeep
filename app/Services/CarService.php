<?php


namespace App\Services;

use App\Services\Requests\CreateCarRequest;
use App\Services\Requests\DestroyCarRequest;
use App\Repositories\CarRepository;
use App\Models\Vehicle;

class CarService
{
    private $carRepository;

    public function __construct(CarRepository $carRepository)
    {
        $this->carRepository = $carRepository;
    }

    /**
     * @param CreateCarRequest $request
     * @return Vehicle
     */
    public function create(CreateCarRequest $request): Vehicle
    {
        $attributes = [
            'brand' => $request->getBrand(),
            'model' => $request->getModel(),
            'color' => $request->getColor(),
            'body' => $request->getBody(),
            'seats' => $request->getSeats(),
            'year' => $request->getYear(),
        ];

        $car = $this->carRepository->save(new Vehicle($attributes));

        return $car;
    }

    public function destroy(DestroyCarRequest $request){
        return $this->carRepository->destroy($request->getId());
    }

}