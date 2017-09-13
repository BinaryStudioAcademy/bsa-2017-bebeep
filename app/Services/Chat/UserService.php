<?php

namespace App\Services\Chat;

use App\User;
use App\Repositories\UserRepository;
use Illuminate\Support\Collection;
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
     * @inheritDoc
     */
    public function getOthers(User $user): Collection
    {
        return collect($this->userRepository->findWhere([['id', '<>', $user->id]]));
    }
}
