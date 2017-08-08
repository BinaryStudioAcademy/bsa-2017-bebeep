<?php
namespace App\Services;

use App\Managers\TripsManager;
use App\Services\Contracts\TripsListService as InterfaceTripsListService;

class TripsListService implements InterfaceTripsListService
{
    protected $manager;

    public function __construct(TripsManager  $manager)
    {
        $this->manager = $manager;
    }

    /** @inheritdoc */
    public function getUserTrips(int $userId){
      $allUserTrips = $this->manager->userTrips($userId);
      return $allUserTrips;
    }
}