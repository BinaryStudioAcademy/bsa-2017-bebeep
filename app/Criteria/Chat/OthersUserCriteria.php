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

        $queryBuilder = $model->where('id', '<>', $this->user->id);

        if (! $this->request->areNamesParamsIdentical()) {
            return $queryBuilder->where([
                ['first_name', '=', $this->request->getFirstName()],
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
