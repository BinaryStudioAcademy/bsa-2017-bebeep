<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use App\Http\Requests\DeleteCarRequest;
use App\Models\Vehicle;

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

    /**
     * @param Vehicle $vehicle
     * @param $id
     * @return bool|null
     */
    public function destroy($id)
    {
        return $this->delete($id);
    }
}