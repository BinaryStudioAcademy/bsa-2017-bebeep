<?php
namespace App\Services\Contracts;

interface TripsListService
{
    /**
     * Return data about all user trips
     *
     * @param int $userId
     * @return mixed
     */
    public function getUserTrips(int $userId);
}