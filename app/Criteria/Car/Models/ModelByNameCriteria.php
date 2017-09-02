<?php

namespace App\Criteria\Car\Models;

use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface;

class ModelByNameCriteria implements CriteriaInterface
{
    protected $name;

    public function __construct(string $name)
    {
        $this->name = $name;
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
        return $model->where('name', 'like', "{$this->name}%")->latest('id_car_model');
    }
}
