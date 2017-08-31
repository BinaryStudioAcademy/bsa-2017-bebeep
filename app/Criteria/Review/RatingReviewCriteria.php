<?php

namespace App\Criteria\Review;

use App\User;
use Illuminate\Support\Facades\DB;
use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface;

class RatingReviewCriteria implements CriteriaInterface
{
    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Apply criteria in query repository.
     *
     * @param                     $model
     * @param RepositoryInterface $repository
     *
     * @return mixed
     */
    public function apply($model, RepositoryInterface $repository)
    {
        return $model
            ->select(DB::raw('count(*) as mark_count, mark'))
            ->where(['driver_id' => $this->user->id])
            ->groupBy('mark');
    }
}
