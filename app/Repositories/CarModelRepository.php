<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use App\Models\CarModel;

class CarModelRepository extends BaseRepository
{
    /**
     * @return string
     */
    public function model()
    {
        return CarModel::class;
    }
}