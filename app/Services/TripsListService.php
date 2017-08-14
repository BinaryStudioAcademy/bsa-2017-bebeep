<?php
namespace App\Services;

use App\Repositories\TripRepository;
use App\Services\Contracts\TripsListService as InterfaceTripsListService;
use App\Services\Requests\GetTripsListRequest;
use Illuminate\Support\Collection;

class TripsListService implements InterfaceTripsListService
{
    protected $repository;

    public function __construct(TripRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Return data about all user trips
     *
     * @param GetTripsListRequest $request
     * @param $user
     * @return Collection
     */
    public function getUserTrips(GetTripsListRequest $request,$user) :Collection
    {
      $allUserTrips = $this->repository->getAllTrips($user->id);

      return $allUserTrips;
    }

    /**
     * Return data about all user trips
     *
     * @param GetTripsListRequest $request
     * @param $user
     * @return Collection
     */
    public function getPastUserTrips(GetTripsListRequest $request, $user) :Collection
    {
        $pastUserTrips = $this->repository->getPastTrips($user->id);

        return $pastUserTrips;
    }

    /**
     * Return data about upcoming user trips
     * @param GetTripsListRequest $request
     * @param $user
     * @return Collection
     */
    public function getUpcomingUserTrips(GetTripsListRequest $request, $user) :Collection
    {
        $upcomingUserTrips = $this->repository->getUpcomingTrips($user->id);

        return $upcomingUserTrips;
    }
}