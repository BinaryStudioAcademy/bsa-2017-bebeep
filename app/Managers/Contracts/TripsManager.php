<?php
namespace App\Managers\Contracts;

interface TripsManager
{
    /**
     * Method return collection with data about each user trip.
     * @param int $id
     * @return mixed
     */
    public function userTrips(int $id);
}