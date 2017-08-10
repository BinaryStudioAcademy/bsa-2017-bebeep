<?php

namespace App\Services;

use App\User;
use App\Repositories\UserRepository;

class UserProfileService
{
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function getGeneralData()
    {
        $id = 1; // Auth::user()->id
        return $this->userRepository->find($id);
    }
}
