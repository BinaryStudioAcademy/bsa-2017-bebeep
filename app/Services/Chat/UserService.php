<?php

namespace App\Services\Chat;

use App\User;
use Illuminate\Support\Collection;
use App\Repositories\UserRepository;
use App\Criteria\Chat\OthersUserCriteria;
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
    public function getOthers(User $user): Collection
    {
        return collect($this->userRepository->getByCriteria(new OthersUserCriteria($user)));
    }
}
