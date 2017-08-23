<?php

namespace App\Services;

use App\Services\Result\SearchTrip;
use App\Services\Result\SearchTripCollection;
use App\User;
use Carbon\Carbon;
use App\Models\Trip;
use App\Repositories\TripRepository;
use App\Repositories\RouteRepository;
use App\Validators\DeleteTripValidator;
use App\Validators\UpdateTripValidator;
use App\Validators\RestoreTripValidator;
use App\Services\Requests\CreateTripRequest;
use App\Services\Requests\SearchTripRequest;
use App\Services\Requests\UpdateTripRequest;
use Prettus\Repository\Contracts\CriteriaInterface;
use App\Criteria\Trips\AllDriverTripsCriteria;
use App\Criteria\Trips\DriverTripByIdCriteria;
use App\Criteria\Trips\PastDriverTripsCriteria;
use App\Criteria\Trips\UpcomingDriverTripsCriteria;

class TripsService
{
    protected $routeRepository;
    private $tripRepository;
    private $deleteTripValidator;
    private $restoreTripValidator;
    private $updateTripValidator;

    /**
     * TripsService constructor.
     *
     * @param TripRepository $tripRepository
     * @param RouteRepository $routeRepository
     * @param DeleteTripValidator $deleteTripValidator
     * @param RestoreTripValidator $restoreTripValidator
     * @param UpdateTripValidator $updateTripValidator
     */
    public function __construct(
        TripRepository $tripRepository,
        RouteRepository $routeRepository,
        DeleteTripValidator $deleteTripValidator,
        RestoreTripValidator $restoreTripValidator,
        UpdateTripValidator $updateTripValidator
    ) {
        $this->tripRepository = $tripRepository;
        $this->routeRepository = $routeRepository;
        $this->deleteTripValidator = $deleteTripValidator;
        $this->restoreTripValidator = $restoreTripValidator;
        $this->updateTripValidator = $updateTripValidator;
    }

    public static function getRoutesFromWaypoints($startPoint, $endPoint, $waypoints)
    {
        $tripWaypoints = collect([$startPoint]);
        $routes = collect([]);

        if (! empty($waypoints)) {
            foreach ($waypoints as $tripWaypoint) {
                $tripWaypoints->push($tripWaypoint);
            }
        }

        $tripWaypoints->push($endPoint);

        foreach (range(0, $tripWaypoints->count() - 2) as $iteration) {
            $chunk = $tripWaypoints->slice($iteration, 2)->values();

            $routes->push([
                'from' => $chunk[0],
                'from_lat' => $chunk[0]['geometry']['location']['lat'],
                'from_lng' => $chunk[0]['geometry']['location']['lng'],
                'to' => $chunk[1],
                'to_lat' => $chunk[1]['geometry']['location']['lat'],
                'to_lng' => $chunk[1]['geometry']['location']['lng'],
            ]);
        }

        return $routes;
    }

    /**
     * @param User $user
     *
     * @return mixed
     */
    public function getAll(User $user)
    {
        return $this->tripRepository->getByCriteria(new AllDriverTripsCriteria($user));
    }

    /**
     * @param User $user
     *
     * @return mixed
     */
    public function getUpcoming(User $user)
    {
        return $this->tripRepository->getByCriteria(new UpcomingDriverTripsCriteria($user));
    }

    /**
     * @param User $user
     *
     * @return mixed
     */
    public function getPast(User $user)
    {
        return $this->tripRepository->getByCriteria(new PastDriverTripsCriteria($user));
    }

    /**
     * @param CreateTripRequest $request
     * @param $user
     *
     * @return Trip
     */
    public function create(CreateTripRequest $request, $user) : Trip
    {
        $tripAttributes = [
            'price' => $request->getPrice(),
            'seats' => $request->getSeats(),
            'start_at' => $request->getStartAt(),
            'end_at' => $request->getEndAt(),
            'vehicle_id' => $request->getVehicleId(),
            'user_id' => $user->id,
        ];

        $trip = $this->tripRepository->save(new Trip($tripAttributes));

        $routes = self::getRoutesFromWaypoints(
            $request->getFrom(),
            $request->getTo(),
            $request->getWaypoints()
        );

        foreach ($routes as $route) {
            $trip->routes()->create($route);
        }

        return $trip;
    }

    /**
     * @param Trip $trip
     * @param User $user
     *
     * @return mixed
     */
    public function show(Trip $trip, User $user)
    {
        return $this->tripRepository
            ->getByCriteria(new DriverTripByIdCriteria($trip, $user))
            ->first();
    }

    /**
     * Update trip service.
     *
     * @param Trip $trip
     * @param UpdateTripRequest $request
     * @param $user
     *
     * @return mixed
     */
    public function update(Trip $trip, UpdateTripRequest $request, $user)
    {
        $this->updateTripValidator->validate($trip, $user);

        $tripAttributes = [
            'price' => $request->getPrice(),
            'seats' => $request->getSeats(),
            'start_at' => $request->getStartAt(),
            'end_at' => $request->getEndAt(),
            'vehicle_id' => $request->getVehicleId(),
        ];

        $result = $this->tripRepository->update($tripAttributes, $trip->id);
        // don't use this way of storing models. Your repository shouldn't know about arrays

        $trip->routes()->delete();

        $routes = self::getRoutesFromWaypoints(
            $request->getFrom(),
            $request->getTo(),
            $request->getWaypoints()
        );

        foreach ($routes as $route) {
            $trip->routes()->create($route);
        }

        return $result;
    }

    /**
     * @param Trip $trip
     * @param $user
     *
     * @return Trip
     */
    public function delete(Trip $trip, $user)
    {
        $this->deleteTripValidator->validate($trip, $user);
        $this->tripRepository->softDelete($trip);

        return $trip;
    }

    /**
     * @param  SearchTripRequest $request
     *
     * @return mixed
     */
    public function search(SearchTripRequest $request) : SearchTripCollection
    {
        /*$data = [];
        $faker = \Faker\Factory::create();
        $countAllData = $request->getLimit() * 4.2;
        for ($i = 1; $i < $countAllData + 1; $i++) {
            $user = factory(User::class)->make();
            $trip = factory(Trip::class)->make([
                'id' => $i,
                'start_at' => $faker->dateTimeInInterval('0 years', $interval = '+ 5 days'),
            ]);
            $routes = [
                'from' => ['point' => $faker->city, 'id' => $i.'1'],
                'to' => ['point' => $faker->city, 'id' => $i.'2'],
                'points' => [],
            ];
            $routes['points'][] = $routes['from'];
            $routes['points'][] = $routes['to'];
            if (rand(1, 1000) > 500) {
                array_unshift($routes['points'], ['point' => $faker->city, 'id' => $i.'3']);
            }
            if (rand(1, 1000) > 500) {
                $routes['points'][] = ['point' => $faker->city, 'id' => $i.'4'];
            }

            $start_at = $trip->start_at;
            if ($start_at->isToday()) {
                $start = 'Today';
            } elseif ($start_at->isTomorrow()) {
                $start = 'Tomorrow';
            } else {
                $start = [
                        'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
                    ][$start_at->dayOfWeek].'. '.str_pad($start_at->day, 2, '0', STR_PAD_LEFT).' '.[
                        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
                    ][$start_at->month - 1];
            }
            $hours = str_pad($start_at->hour, 2, '0', STR_PAD_LEFT);
            $minutes = str_pad($start_at->minute, 2, '0', STR_PAD_LEFT);
            $start .= " - {$hours}:{$minutes}";
            $data[] = [
                'id' => $i,
                'price' => $trip->price,
                'seats' => $trip->seats,
                'start_date' => $start,
                'start_at' => $trip->start_at->timestamp,
                'route' => $routes,
                'user' => [
                    'full_name' => $user->first_name.' '.$user->last_name,
                    'age' => Carbon::now()->year - $user->birth_date->year,
                    'first_name' => $user->first_name,
                    'last_name' => $user->last_name,
                    'birth_date' => $user->birth_date->timestamp,
                    'photo' => 'http://lorempixel.com/200/200/',
                ],
            ];
        }
        usort($data, function ($a, $b) use ($request) {
            $first = $request->isAsc() ? 'a' : 'b';
            $second = $request->isAsc() ? 'b' : 'a';
            switch ($request->getSort()) {
                case 'price':
                    return $$first['price'] <=> $$second['price'];
                case 'start_at':
                    return $$first['start_at'] <=> $$second['start_at'];
                default:
                    return $$first['id'] <=> $$second['id'];
            }
        });
        $pages = array_chunk($data, $request->getLimit());
        $countData = count($pages);
        return [
            'collection' => ($countData > $request->getPage()
                ? $pages[$request->getPage() - 1]
                : $pages[$countData - 1]),
            'meta' => [
                'total' => $countAllData,
                'price' => ['max' => 1000, 'min' => 0],
            ],
        ];*/

        $search = $this->tripRepository->search()
            ->addLocation(
                $request->getFromLat(),
                $request->getFromLng(),
                $request->getToLat(),
                $request->getToLng()
            )
            ->addDate($request->getStartAt())
            ->setOrder($request->getSort(), $request->getOrder())
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
     * @param  Trip $trip
     * @param  User $user
     *
     * @return Trip
     */
    public function restore(Trip $trip, User $user) : Trip
    {
        $this->restoreTripValidator->validate($trip, $user);
        $this->tripRepository->restore($trip);

        return $trip;
    }
}
