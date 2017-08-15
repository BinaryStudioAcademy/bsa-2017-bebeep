<?php


namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use App\Models\CarBrand;

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