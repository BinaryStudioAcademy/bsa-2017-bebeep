<?php

namespace App\Services;

use App\User;
use App\Models\Trip;
use App\Events\TripCreated;
use App\Events\TripUpdated;
use App\Services\Result\SearchTrip;
use App\Repositories\TripRepository;
use App\Repositories\RouteRepository;
use App\Validators\DeleteTripValidator;
use App\Validators\UpdateTripValidator;
use App\Repositories\CurrencyRepository;
use App\Validators\RestoreTripValidator;
use App\Services\Helpers\SaveVehicleRequest;
use App\Services\Requests\CreateTripRequest;
use App\Services\Requests\SearchTripRequest;
use App\Services\Requests\UpdateTripRequest;
use App\Services\Result\SearchTripCollection;
use App\Criteria\Trips\AllDriverTripsCriteria;
use App\Criteria\Trips\DriverTripByIdCriteria;
use App\Criteria\Trips\PastDriverTripsCriteria;
use App\Criteria\Trips\UpcomingDriverTripsCriteria;

class TripsService
{
    /**
     * @var \App\Repositories\TripRepository
     */
    private $tripRepository;
    /**
     * @var \App\Repositories\RouteRepository
     */
    private $routeRepository;
    /**
     * @var \App\Repositories\CurrencyRepository
     */
    private $currencyRepository;
    /**
     * @var \App\Services\CarService
     */
    private $carService;
    /**
     * @var \App\Validators\UpdateTripValidator
     */
    private $updateTripValidator;
    /**
     * @var \App\Validators\DeleteTripValidator
     */
    private $deleteTripValidator;
    /**
     * @var \App\Validators\RestoreTripValidator
     */
    private $restoreTripValidator;

    /**
     * TripsService constructor.
     *
     * @param \App\Repositories\TripRepository $tripRepository
     * @param \App\Repositories\RouteRepository $routeRepository
     * @param \App\Repositories\CurrencyRepository $currencyRepository
     * @param \App\Services\CarService $carService
     * @param \App\Validators\UpdateTripValidator $updateTripValidator
     * @param \App\Validators\DeleteTripValidator $deleteTripValidator
     * @param \App\Validators\RestoreTripValidator $restoreTripValidator
     */
    public function __construct(
        TripRepository $tripRepository,
        RouteRepository $routeRepository,
        CurrencyRepository $currencyRepository,
        CarService $carService,
        UpdateTripValidator $updateTripValidator,
        DeleteTripValidator $deleteTripValidator,
        RestoreTripValidator $restoreTripValidator
    ) {
        $this->tripRepository = $tripRepository;
        $this->routeRepository = $routeRepository;
        $this->currencyRepository = $currencyRepository;
        $this->carService = $carService;
        $this->updateTripValidator = $updateTripValidator;
        $this->deleteTripValidator = $deleteTripValidator;
        $this->restoreTripValidator = $restoreTripValidator;
    }

    /**
     * Get routes data from the trip waypoints.
     *
     * @param array $params
     *
     * @return \Illuminate\Support\Collection
     */
    public static function getRoutesFromWaypoints(array $params)
    {
        // TODO :: Need to change this code to work with
        // the collection of Waypoints instances

        /** @var Helpers\RoutePriceHelper $priceHelper */
        [
            'from' => $startPoint,
            'to' => $endPoint,
            'waypoints' => $waypoints,
            'routes' => $routesTime,
            'priceHelper' => $priceHelper
        ] = $params;

        $tripWaypoints = collect([$startPoint]);
        $routes = collect([]);

        if (! empty($waypoints)) {
            foreach ($waypoints as $tripWaypoint) {
                $tripWaypoints->push($tripWaypoint);
            }
        }

        $tripWaypoints->push($endPoint);

        foreach (range(0, $tripWaypoints->count() - 2) as $key => $iteration) {
            $chunk = $tripWaypoints->slice($iteration, 2)->values();

            $routes->push([
                'from' => $chunk[0],
                'from_lat' => $chunk[0]['geometry']['location']['lat'],
                'from_lng' => $chunk[0]['geometry']['location']['lng'],
                'to' => $chunk[1],
                'to_lat' => $chunk[1]['geometry']['location']['lat'],
                'to_lng' => $chunk[1]['geometry']['location']['lng'],
                'start_at' => $routesTime[$key]['start_at'],
                'end_at' => $routesTime[$key]['end_at'],
                'price' => $priceHelper->getPriceByKey($key),
            ]);
        }

        return $routes;
    }

    /**
     * Get all trips.
     *
     * @param \App\User $user
     *
     * @return mixed
     */
    public function getAll(User $user)
    {
        return $this->tripRepository->getByCriteria(new AllDriverTripsCriteria($user));
    }

    /**
     * Get upcoming trips.
     *
     * @param \App\User $user
     *
     * @return mixed
     */
    public function getUpcoming(User $user)
    {
        return $this->tripRepository->getByCriteria(new UpcomingDriverTripsCriteria($user));
    }

    /**
     * Get past trips.
     *
     * @param \App\User $user
     *
     * @return mixed
     */
    public function getPast(User $user)
    {
        return $this->tripRepository->getByCriteria(new PastDriverTripsCriteria($user));
    }

    /**
     * @param CreateTripRequest $request
     * @param User $user
     * @return \Illuminate\Support\Collection
     */
    public function createRecurring(CreateTripRequest $request, User $user)
    {
        $trips = collect([]);

        foreach (range(1, $request->getRecurringCount()) as $periodItem) {
            $trips->push($this->create($request, $user));

            $request->setStartAt($request->getStartAt()->addDays($request->getRecurringPeriod()));
            $request->setEndAt($request->getEndAt()->addDays($request->getRecurringPeriod()));

            if ($request->getIsInBothDirections()) {
                $request->setReverseStartAt($request->getReverseStartAt()->addDays($request->getRecurringPeriod()));
            }
        }

        return $trips;
    }

    /**
     * Create a new trip.
     *
     * @param \App\Services\Requests\CreateTripRequest $request
     * @param \App\User $user
     *
     * @return \App\Models\Trip
     */
    public function create(CreateTripRequest $request, User $user) : Trip
    {
        $tripAttributes = [
            'price' => $request->getPrice(),
            'seats' => $request->getSeats(),
            'start_at' => $request->getStartAt(),
            'end_at' => $request->getEndAt(),
            'luggage_size' => $request->getLuggageSize(),
            'is_animals_allowed' => $request->getIsAnimalsAllowed(),
            'user_id' => $user->id,
        ];

        if ($request->getVehicleId() > 0) {
            $tripAttributes['vehicle_id'] = $request->getVehicleId();
        } else {
            $tripAttributes['vehicle_id'] = $this->carService->create(
                new SaveVehicleRequest(
                    $request->getVehicle(),
                    $user
                )
            )->id;
        }

        $trip = $this->tripRepository->save(new Trip($tripAttributes));

        // TODO :: Need to change this code to work with
        // the collection of Waypoints instances

        $routes = self::getRoutesFromWaypoints([
            'from' => $request->getFrom(),
            'to' => $request->getTo(),
            'waypoints' => $request->getWaypoints(),
            'routes' => $request->getRoutesTime(),
            'priceHelper' => new Helpers\RoutePriceHelper(
                $request->getPrice(),
                $request->getRoutesTime()
            ),
        ]);

        foreach ($routes as $route) {
            $trip->routes()->create($route);
        }

        if ($request->getIsInBothDirections()) {
            $reverseTrip = $this->createReverseTrip($trip, $request);
            event(new TripCreated($reverseTrip));
        }

        event(new TripCreated($trip));

        return $trip;
    }

    /**
     * Show the trip data.
     *
     * @param \App\Models\Trip $trip
     * @param \App\User $user
     *
     * @return \App\Models\Trip
     */
    public function show(Trip $trip, User $user) : Trip
    {
        return $this->tripRepository
            ->getByCriteria(new DriverTripByIdCriteria($trip, $user))
            ->first();
    }

    /**
     * Update the trip.
     *
     * @param \App\Models\Trip $trip
     * @param \App\Services\Requests\UpdateTripRequest $request
     * @param \App\User $user
     *
     * @return \App\Models\Trip
     */
    public function update(Trip $trip, UpdateTripRequest $request, User $user): Trip
    {
        $this->updateTripValidator->validate($trip, $user);

        $attributes = [
            'price' => $request->getPrice(),
            'seats' => $request->getSeats(),
            'start_at' => $request->getStartAt(),
            'end_at' => $request->getEndAt(),
            'vehicle_id' => $request->getVehicleId(),
            'luggage_size' => $request->getLuggageSize(),
            'is_animals_allowed' => $request->getIsAnimalsAllowed(),
        ];

        $trip = $this->tripRepository->updateTrip(new Trip($attributes), $trip->id);

        $trip->routes()->delete();

        // TODO :: Need to change this code to work with
        // the collection of Waypoints instances

        $routes = self::getRoutesFromWaypoints([
            'from' => $request->getFrom(),
            'to' => $request->getTo(),
            'waypoints' => $request->getWaypoints(),
            'routes' => $request->getRoutesTime(),
            'priceHelper' => new Helpers\RoutePriceHelper(
                $request->getPrice(),
                $request->getRoutesTime()
            ),
        ]);

        foreach ($routes as $route) {
            $trip->routes()->create($route);
        }

        event(new TripUpdated($trip));

        return $trip;
    }

    /**
     * Delete the trip.
     *
     * @param \App\Models\Trip $trip
     * @param \App\User $user
     *
     * @return \App\Models\Trip
     */
    public function delete(Trip $trip, User $user): Trip
    {
        $this->deleteTripValidator->validate($trip, $user);
        $this->tripRepository->softDelete($trip);

        return $trip;
    }

    /**
     * Search for the requested trip.
     *
     * @param \App\Services\Requests\SearchTripRequest $request
     *
     * @return \App\Services\Result\SearchTripCollection
     */
    public function search(SearchTripRequest $request)//: SearchTripCollection TODO
    {
        $searchCurrency = $this->currencyRepository->find($request->getCurrencyId());

        $search = $this->tripRepository->search()
            ->addLocation(
                $request->getFromLat(),
                $request->getFromLng(),
                $request->getToLat(),
                $request->getToLng()
            )
            ->addDate(
                $request->getStartAt(),
                $request->getMinTime(),
                $request->getMaxTime()
            )
            //->setPrice($request->getMinPrice(), $request->getMaxPrice())
            ->setOrder($request->getSort(), $request->getOrder())
            ->setIsAnimalsAllowed($request->getIsAnimalsAllowed())
            ->setLuggageSize($request->getLuggageSize())
            ->setSeats($request->getSeats())
            ->setRating($request->getRating())
            ->paginate($request->getLimit(), $request->getPage() - 1);

        $result = $search->getResult();

        $tripCollection = new SearchTripCollection();

        $result->each(function ($trip) use ($tripCollection) {
            $tripCollection->put($trip->id, new SearchTrip($trip));
        });

        $trips = $this->tripRepository->findWhereIn('id', $tripCollection->keys()->toArray());

        $trips->each(function ($trip) use ($tripCollection) {
            $tripCollection[$trip->id]->setModel($trip);
        });

        $tripCollection->setMeta($search->getMetaData());

        return $tripCollection;
    }

    /**
     * Restore the previously deleted trip.
     *
     * @param \App\Models\Trip $trip
     * @param \App\User $user
     *
     * @return \App\Models\Trip
     */
    public function restore(Trip $trip, User $user): Trip
    {
        $this->restoreTripValidator->validate($trip, $user);
        $this->tripRepository->restore($trip);

        return $trip;
    }

    /**
     * Create a new reverse trip.
     *
     * @param \App\Models\Trip $trip
     * @param \App\Services\Requests\CreateTripRequest $request
     * @return Trip
     */
    public function createReverseTrip(Trip $trip, CreateTripRequest $request): Trip
    {
        $originTripTravelTime = $trip->end_at->timestamp - $trip->start_at->timestamp;

        $reverseTripAttributes = array_merge($trip->toArray(), [
            'start_at' => $request->getReverseStartAt(),
            'end_at' => $request->getReverseStartAt()->addSeconds($originTripTravelTime),
        ]);

        $reverseTrip = $this->tripRepository->save(new Trip($reverseTripAttributes));

        // TODO :: Need to change this code to work with
        // the collection of Routes instances

        $routesTime = $this->getRoutesTimeForReverseTrip(
            $reverseTrip->start_at->timestamp,
            array_reverse($request->getRoutesTime())
        );

        // TODO :: Need to change this code to work with
        // the collection of Waypoints instances

        $routes = self::getRoutesFromWaypoints([
            'from' => $request->getTo(),
            'to' => $request->getFrom(),
            'waypoints' => array_reverse($request->getWaypoints()),
            'routes' => $routesTime,
            'priceHelper' => new Helpers\RoutePriceHelper(
                $request->getPrice(),
                $routesTime
            ),
        ]);

        foreach ($routes as $route) {
            $reverseTrip->routes()->create($route);
        }

        return $reverseTrip;
    }

    /**
     * Get the routes start and end time for the reverse trip.
     *
     * @param int $startAt
     * @param array $routesTime
     *
     * @return array
     */
    private function getRoutesTimeForReverseTrip(
        int $startAt,
        array $routesTime
    ): array {

        // TODO :: Need to change this code to work with
        // the collection of Routes instances

        return array_map(function (array $time) use (&$startAt) {
            $duration = $time['end_at'] - $time['start_at'];

            $endAt = $startAt + $duration;
            $newTime = [
                'start_at' => $startAt,
                'end_at' => $endAt,
            ];
            $startAt = $endAt;

            return $newTime;
        }, $routesTime);
    }
}
