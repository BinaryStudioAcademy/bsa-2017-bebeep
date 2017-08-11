<?php


namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use App\Models\CarMark;

class CarMarkRepository extends BaseRepository
{
    /**
     * @return string
     */
    public function model()
    {
        return CarMark::class;
    }
}