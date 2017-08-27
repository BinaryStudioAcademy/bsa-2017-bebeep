<?php

namespace App\Repositories;

use App\Models\Vehicle;
use Prettus\Repository\Eloquent\BaseRepository;

class CarRepository extends BaseRepository
{
    /**
     * @return string
     */
    public function model()
    {
        return Vehicle::class;
    }

    /**
     * @param Vehicle $vehicle
     * @return Vehicle
     */
    public function save(Vehicle $vehicle) : Vehicle
    {
        $vehicle->save();

        return $vehicle;
    }

    public function updateVehicle(Vehicle $vehicle, $id) : Vehicle
    {
        $this->update($vehicle->toArray(), $id);

        return $vehicle;
    }

    /**
     * @param $id
     * @return int
     */
    public function destroy($id)
    {
        return $this->delete($id);
    }
}
