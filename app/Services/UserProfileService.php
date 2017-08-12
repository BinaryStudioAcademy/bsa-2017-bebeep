<?php

namespace App\Services;

use App\User;
use App\Repositories\UserRepository;
use App\Presenters\UserProfilePresenter;

class UserProfileService
{
    /**
     * @var \App\Repositories\UserRepository
     */
    private $userRepository;

    /**
     * @param \App\Repositories\UserRepository $userRepository
     */
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Get the user profile general data.
     *
     * @return array
     */
    public function getGeneralData(): array
    {
        $id = 1; // TODO :: Auth::user()->id
        return $this->userRepository
            ->setPresenter(UserProfilePresenter::class)
            ->find($id);
    }
}
