<?php
namespace App\Services;

use App\Repositories\TripRepository;
use App\Services\Contracts\TripsListService as InterfaceTripsListService;
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
     * @param int $userId
     * @return Collection
     */
    public function getUserTrips(int $userId) :Collection
    {
      $allUserTrips = $this->repository->getAllTrips($userId);

      return $allUserTrips;
    }

    /**
     * Return data about past user trips
     * @param int $userId
     * @return Collection
     */
    public function getPastUserTrips(int $userId)
    {
        $pastUserTrips = $this->repository->getPastTrips($userId);

        return $pastUserTrips;
    }

    /**
     * Return data about upcoming user trips
     * @param int $userId
     * @return Collection
     */
    public function getUpcomingUserTrips(int $userId)
    {
        $upcomingUserTrips = $this->repository->getUpcomingTrips($userId);

        return $upcomingUserTrips;
    }
}