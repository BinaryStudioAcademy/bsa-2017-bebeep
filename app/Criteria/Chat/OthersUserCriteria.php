<?php

namespace App\Criteria\Chat;

use App\User;
use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface;

/**
 * Class OthersUserCriteria
 * @package namespace App\Criteria\Chat;
 */
class OthersUserCriteria implements CriteriaInterface
{
    /**
     * @var User
     */
    private $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Apply criteria in query repository
     *
     * @param                     $model
     * @param RepositoryInterface $repository
     *
     * @return mixed
     */
    public function apply($model, RepositoryInterface $repository)
    {
        return $model->where('id', '<>', $this->user->id)->orderBy('first_name');
    }
}
