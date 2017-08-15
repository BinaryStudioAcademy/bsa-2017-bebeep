<?php

namespace App\Criteria\Trips;

use App\User;
use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface;

class AllDriverTripsCriteria implements CriteriaInterface
{
    private $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function apply($model, RepositoryInterface $repository)
    {
        return $model->whereUserId($this->user->id)->with(['routes', 'vehicle'])->latest('id');
    }
}
