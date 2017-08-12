<?php
namespace App\Services;

use App\Managers\TripsManager;
use App\Exceptions\Trip\UserNotHaveTrips;
use App\Services\Contracts\TripsListService as InterfaceTripsListService;

class TripsListService implements InterfaceTripsListService
{
    protected $manager;

    public function __construct(TripsManager  $manager)
    {
        $this->manager = $manager;
    }

    /**
     * Return data about all user trips
     * @param int $userId
     * @return mixed
     * @throws UserNotHaveTrips
     */
    public function getUserTrips(int $userId){
      $allUserTrips = $this->manager->userTrips($userId);
      if( count($allUserTrips) == 0 )
          throw new UserNotHaveTrips();

      return $allUserTrips;
    }
}