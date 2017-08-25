<?php


namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use App\Models\CarBody;

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