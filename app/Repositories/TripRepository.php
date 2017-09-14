<?php

namespace App\Repositories;

use App\User;
use Carbon\Carbon;
use App\Models\Trip;
use App\Repositories\Helpers\SearchFilter;
use Prettus\Repository\Eloquent\BaseRepository;

class TripRepository extends BaseRepository implements Contracts\TripRepository
{
    /**
     * @return string
     */
    public function model()
    {
        return Trip::class;
    }

    /**
     * {@inheritdoc}
     */
    public function save(Trip $trip)
    {
        $trip->push();

        return $trip;
    }

    /**
     * {@inheritdoc}
     */
    public function updateTrip(Trip $trip, int $id) : Trip
    {
        return $this->update($trip->toArray(), $id);
    }

    /**
     * {@inheritdoc}
     */
    public function softDelete(Trip $trip)
    {
        $trip->delete();

        return $trip;
    }

    /**
     * {@inheritdoc}
     */
    public function restore(Trip $trip)
    {
        $trip->restore();

        return $trip;
    }

    /**
     * {@inheritdoc}
     */
    public function search() : SearchFilter
    {
        return new SearchFilter();
    }

    /**
     * {@inheritdoc}
     */
    public function getPastTripsCountForDriver(User $user) : int
    {
        return $this->model->where([
            ['user_id', $user->id],
            ['end_at', '<', Carbon::now()],
        ])->count();
    }

    /**
     * {@inheritdoc}
     */
    public function getPastTripsCountForPassenger(User $user) : int
    {
        return $this->model->whereHas('bookings', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->where('end_at', '<', Carbon::now())->count();
    }
}
