<?php

namespace App\Services\Chat;

use App\User;
use Illuminate\Support\Collection;
use App\Repositories\UserRepository;
use App\Criteria\Chat\OthersUserCriteria;
use App\Services\Requests\Chat\UsersSearchRequest;
use App\Services\Contracts\Chat\UserService as UserServiceContract;

class UserService implements UserServiceContract
{
    /**
     * @var UserRepository
     */
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * {@inheritdoc}
     */
    public function getOthers(UsersSearchRequest $request, User $user): Collection
    {
        $this->userRepository->pushCriteria(new OthersUserCriteria($request, $user));

        return $this->userRepository->all();
    }
}
