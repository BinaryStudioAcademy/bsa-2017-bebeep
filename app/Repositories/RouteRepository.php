<?php

namespace App\Repositories;

use App\Models\Route;
use Prettus\Repository\Eloquent\BaseRepository;

class RouteRepository extends BaseRepository
{
    /**
     * @return string
     */
    public function model()
    {
        return Route::class;
    }
}
