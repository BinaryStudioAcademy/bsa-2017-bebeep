<?php

namespace App\Criteria\Chat;

use App\User;
use App\Services\Requests\Chat\UsersSearchRequest;
use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface;

class OthersUserCriteria implements CriteriaInterface
{
    /**
     * @var \App\User
     */
    private $user;
    /**
     * @var \App\Services\Requests\Chat\UsersSearchRequest
     */
    private $request;

    /**
     * @param \App\Services\Requests\Chat\UsersSearchRequest $request
     * @param \App\User $user
     */
    public function __construct(UsersSearchRequest $request, User $user)
    {
        $this->user = $user;
        $this->request = $request;
    }

    /**
     * Get others users by sent and received messages condition.
     *
     * Get only users who have sent or received at least one message
     * from / to the current auth user.
     *
     * @param \App\User $model
     *
     * @return mixed
     */
    private function getUsersBySentAndReceivedMessages(User $model)
    {
        return $model
            ->whereHas('sentMessages', function ($query) {
                $query->where('recipient_id', $this->user->id);
            })
            ->orWhereHas('receivedMessages', function ($query) {
                $query->where('sender_id', $this->user->id);
            })
            ->orderBy('first_name');
    }

    /**
     * Get others users by search filter params.
     *
     * @param \App\User $model
     *
     * @return mixed
     */
    private function getUsersByFilter(User $model)
    {
        return $model
            ->where('id', '<>', $this->user->id)
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

    /**
     * Get others users by the first name with search filter params.
     *
     * @param \App\User $model
     *
     * @return mixed
     */
    private function getUsersByNameWithFilter(User $model)
    {
        return $model
            ->where('id', '<>', $this->user->id)
            ->where([
                ['first_name', '=', $this->request->getFirstName()],
                ['last_name', 'like', $this->request->getLastName().'%'],
            ])
            ->orderBy('first_name');
    }

    /**
     * Apply criteria in query repository.
     *
     * @param \App\User $model
     * @param \Prettus\Repository\Contracts\RepositoryInterface $repository
     *
     * @return mixed
     */
    public function apply($model, RepositoryInterface $repository)
    {
        if (! $this->request->isSearchFilterExists()) {
            return $this->getUsersBySentAndReceivedMessages($model);
        }

        if (! $this->request->areNamesParamsIdentical()) {
            return $this->getUsersByNameWithFilter($model);
        }

        return $this->getUsersByFilter($model);
    }
}
