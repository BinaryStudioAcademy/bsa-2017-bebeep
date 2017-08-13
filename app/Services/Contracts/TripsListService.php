<?php
namespace App\Services\Contracts;

use Illuminate\Support\Collection;

interface TripsListService
{
    /**
     * Return data about all user trips
     *
     * @param int $userId
     * @return mixed
     */
    public function getUserTrips(int $userId): Collection;

    /**
     * Return data about past user trips
     * @param int $userId
     * @return Collection
     */
    public function getPastUserTrips(int $userId) :Collection;

    /**
     * Return data about upcoming user trips
     * @param int $userId
     * @return Collection
     */
    public function getUpcomingUserTrips(int $userId) :Collection;
}