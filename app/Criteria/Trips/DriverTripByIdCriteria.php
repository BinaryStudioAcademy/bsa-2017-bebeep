<?php

namespace App\Criteria\Trips;

use App\User;
use App\Models\Trip;
use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface;

class DriverTripByIdCriteria implements CriteriaInterface
{
    /**
     * @var Trip
     */
    private $trip;

    /**
     * @var User
     */
    private $user;

    /**
     * DriverTripByIdCriteria constructor.
     *
     * @param Trip $trip
     * @param User $user
     */
    public function __construct(Trip $trip, User $user)
    {
        $this->trip = $trip;
        $this->user = $user;
    }

    /**
     * @param $model
     * @param RepositoryInterface $repository
     * @return mixed
     */
    public function apply($model, RepositoryInterface $repository)
    {
        return $model->whereUserId($this->user->id)->find($this->trip->id)->with('routes');
    }
}
