<?php

namespace App\Services;

use App\Models\Vehicle;
use Illuminate\Http\Request;
use App\Repositories\CarRepository;
use App\Services\Requests\SaveCarRequestInterface;

class CarService
{
    private $carRepository;

    /**
     * CarService constructor.
     * @param CarRepository $carRepository
     */
    public function __construct(CarRepository $carRepository)
    {
        $this->carRepository = $carRepository;
    }

    /**
     * @param SaveCarRequestInterface $request
     * @return Vehicle
     */
    public function create(SaveCarRequestInterface $request): Vehicle
    {
        $attributes = [
            'brand' => $request->getBrand(),
            'model' => $request->getModel(),
            'color' => $request->getColor(),
            'body' => $request->getBody(),
            'seats' => $request->getSeats(),
            'year' => $request->getYear(),
            'photo' => $request->getPhoto(),
            'user_id' => $request->getUserId(),
        ];

        $car = $this->carRepository->save(new Vehicle($attributes));

        return $car;
    }

    /**
     * @param SaveCarRequestInterface $request
     * @param $id
     * @return Vehicle
     */
    public function update(SaveCarRequestInterface $request, $id): Vehicle
    {
        $attributes = [
            'brand' => $request->getBrand(),
            'model' => $request->getModel(),
            'color' => $request->getColor(),
            'body' => $request->getBody(),
            'seats' => $request->getSeats(),
            'year' => $request->getYear(),
            'photo' => $request->getPhoto(),
        ];

        $car = $this->carRepository->updateVehicle(new Vehicle($attributes), $id);

        return $car;
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function getAll(Request $request)
    {
        return $this->carRepository->findWhere(['user_id' => $request->user()->id]);
    }

    /**
     * @param $id
     * @return mixed
     */
    public function getById($id)
    {
        return $this->carRepository->find($id);
    }

    /**
     * @param $id
     * @return int
     */
    public function destroy($id)
    {
        return $this->carRepository->destroy($id);
    }
}
