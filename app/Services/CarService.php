<?php


namespace App\Services;

use App\Services\Requests\CreateCarRequest;
use App\Repositories\CarRepository;
use App\Models\Vehicle;
use Illuminate\Support\Facades\Auth;

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
            'year' => date_create_from_format("Y", $request->getYear()),
            'photo' => $request->getPhoto(),
            'user_id' => Auth::user()->id,
        ];

        $car = $this->carRepository->save(new Vehicle($attributes));

        return $car;
    }

    /**
     * @param CreateCarRequest $request
     * @param $id
     * @return Vehicle
     */
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

    /**
     * @return mixed
     */
    public function getAll()
    {
        return $this->carRepository->findWhere(['user_id' => Auth::user()->id]);
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