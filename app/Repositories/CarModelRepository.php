<?php

namespace App\Repositories;

use App\Models\CarModel;
use Prettus\Repository\Eloquent\BaseRepository;

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
