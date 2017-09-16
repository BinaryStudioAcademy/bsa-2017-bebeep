<?php

namespace App\Criteria\Chat;

use App\User;
use App\Services\Requests\Chat\UsersSearchRequest;
use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface;

class OthersUserCriteria implements CriteriaInterface
{
    /**
     * @var User
     */
    private $user;
    /**
     * @var UsersSearchRequest
     */
    private $request;

    public function __construct(UsersSearchRequest $request, User $user)
    {
        $this->user = $user;
        $this->request = $request;
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
        $queryBuilder = $model->where('id', '<>', $this->user->id);

        if (! $this->request->areNamesParamsIdentical()) {
            return $queryBuilder->where([
                ['first_name', 'like', $this->request->getFirstName().'%'],
                ['last_name', 'like', $this->request->getLastName().'%'],
            ])
            ->orderBy('first_name');
        }

        return $queryBuilder
            ->where(function ($query) {
                if ($this->request->getEmail()) {
                    $query->orWhere('email', 'like', $this->request->getEmail().'%');
                }
                if ($this->request->getFirstName()) {
                    $query->orWhere('first_name', 'like', $this->request->getFirstName().'%');
                }
                if ($this->request->getLastName()) {
                    $query->orWhere('last_name', 'like', $this->request->getLastName().'%');
                }

                return $query;
            })
            ->orderBy('first_name');
    }
}
