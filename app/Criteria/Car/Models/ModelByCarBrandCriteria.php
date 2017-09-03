<?php

namespace App\Criteria\Car\Models;

use App\Models\CarBrand;
use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface;

class ModelByCarBrandCriteria implements CriteriaInterface
{
    protected $carBrand;

    public function __construct(CarBrand $carBrand)
    {
        $this->carBrand = $carBrand;
    }

    /**
     * Apply criteria in query repository.
     *
     * @param                     $model
     * @param RepositoryInterface $repository
     *
     * @return mixed
     */
    public function apply($model, RepositoryInterface $repository)
    {
        return $model
            ->whereIdCarMark($this->carBrand->id_car_mark)
            ->orderBy('name');
    }
}
