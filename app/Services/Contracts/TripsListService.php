<?php
namespace App\Services\Contracts;

use App\Services\Requests\GetTripsListRequest;
use Illuminate\Support\Collection;

interface TripsListService
{
    /**
     * Return data about all user trips
     *
     * @param GetTripsListRequest $request
     * @param $user
     * @return Collection
     */
    public function getUserTrips(GetTripsListRequest $request,$user) :Collection;

    /**
     * Return data about past user trips
     *
     * @param GetTripsListRequest $request
     * @param $user
     * @return Collection
     */
    public function getPastUserTrips(GetTripsListRequest $request,$user) :Collection;

    /**
     * Return data about upcoming user trips
     *
     * @param GetTripsListRequest $request
     * @param $user
     * @return Collection
     */
    public function getUpcomingUserTrips(GetTripsListRequest $request,$user) :Collection;

}