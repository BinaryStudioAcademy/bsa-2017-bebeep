<?php

namespace App\Repositories;

use App\Models\CarColor;
use Prettus\Repository\Eloquent\BaseRepository;

class CarColorRepository extends BaseRepository
{
    /**
     * @return string
     */
    public function model()
    {
        return CarColor::class;
    }
}
