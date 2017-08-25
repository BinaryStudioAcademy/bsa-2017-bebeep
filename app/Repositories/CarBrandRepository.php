<?php

namespace App\Repositories;

use App\Models\CarBrand;
use Prettus\Repository\Eloquent\BaseRepository;

class CarBrandRepository extends BaseRepository
{
    /**
     * @return string
     */
    public function model()
    {
        return CarBrand::class;
    }
}
