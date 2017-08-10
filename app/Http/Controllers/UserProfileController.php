<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Services\UserProfileService;

class UserProfileController extends Controller
{
    /**
     * @var \App\Services\UserProfileService
     */
    private $userProfileService;

    /**
     * @param \App\Services\UserProfileService $userProfileService
     */
    public function __construct(UserProfileService $userProfileService)
    {
        $this->userProfileService = $userProfileService;
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function getGeneral(): JsonResponse
    {
        $user = $this->userProfileService->getGeneralData();

        return response()->json($user);
    }
}
