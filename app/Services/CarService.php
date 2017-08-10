<?php


namespace App\Services;

use App\Services\Requests\CreateCarRequest;
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
            'year' => date_create_from_format("Y",$request->getYear()),
            'photo' => $request->getPhoto(),
        ];

        $car = $this->carRepository->save(new Vehicle($attributes));

        return $car;
    }

    public function update(CreateCarRequest $request, $id): Vehicle
    {
        $attributes = [
            'brand' => $request->getBrand(),
            'model' => $request->getModel(),
            'color' => $request->getColor(),
            'body' => $request->getBody(),
            'seats' => $request->getSeats(),
            'year' => $request->getYear(),
            'photo' => $request->getPhoto()
        ];

        $car = $this->carRepository->update($attributes, $id);

        return $car;
    }

    public function getAll()
    {
        return $this->carRepository->all();
    }

    public function getById($id)
    {
        return $this->carRepository->find($id);
    }

    public function destroy($id)
    {
        return $this->carRepository->destroy($id);
    }

}