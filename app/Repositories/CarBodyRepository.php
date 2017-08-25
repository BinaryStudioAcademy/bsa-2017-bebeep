<?php

namespace App\Repositories;

use App\Models\CarBody;
use Prettus\Repository\Eloquent\BaseRepository;

class CarBodyRepository extends BaseRepository
{
    /**
     * @return string
     */
    public function model()
    {
        return CarBody::class;
    }
}
