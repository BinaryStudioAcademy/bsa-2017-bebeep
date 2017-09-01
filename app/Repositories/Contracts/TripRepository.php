<?php

namespace App\Repositories\Contracts;

use App\User;
use Carbon\Carbon;
use App\Models\Trip;
use App\Repositories\Helpers\SearchFilter;
use Prettus\Repository\Contracts\RepositoryInterface;
use Prettus\Repository\Contracts\RepositoryCriteriaInterface;

interface TripRepository extends RepositoryInterface, RepositoryCriteriaInterface
{
    /**
     * @param \App\Models\Trip $trip
     *
     * @return \App\Models\Trip
     */
    public function save(Trip $trip);

    /**
     * @param \App\Models\Trip $trip
     *
     * @return \App\Models\Trip
     */
    public function softDelete(Trip $trip);

    /**
     * @param \App\Models\Trip $trip
     *
     * @return \App\Models\Trip
     */
    public function restore(Trip $trip);

    /**
     * @return \App\Repositories\Helpers\SearchFilter
     */
    public function search() : SearchFilter;

    /**
     * Get past trips count for the driver user.
     *
     * @param \App\User $user
     *
     * @return int
     */
    public function getPastTripsCountForDriver(User $user) : int;

    /**
     * Get past trips count for the passenger user.
     *
     * @param \App\User $user
     *
     * @return int
     */
    public function getPastTripsCountForPassenger(User $user) : int;
}
