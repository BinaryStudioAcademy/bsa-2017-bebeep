<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use App\Models\CarColor;

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