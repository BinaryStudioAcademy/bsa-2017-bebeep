<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Services\UserProfileService;

class ProfileController extends Controller
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
     * Get the user profile general data.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(): JsonResponse
    {
        $user = $this->userProfileService->getGeneralData();

        return response()->json($user);
    }

    /**
     * Update the user profile general data.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(): JsonResponse
    {
        $user = $this->userProfileService->getGeneralData();

        return response()->json($user);
    }
}
