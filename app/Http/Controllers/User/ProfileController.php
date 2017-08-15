<?php

namespace App\Http\Controllers\User;

use Auth;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Services\Contracts\UserProfileService;
use App\Http\Requests\UpdateUserProfileRequest;

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
        $user = $this->userProfileService->getGeneral(Auth::user()->id);

        return response()->json($user);
    }

    /**
     * Update the user profile general data.
     *
     * @param \App\Http\Requests\UpdateUserProfileRequest $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateUserProfileRequest $request): JsonResponse
    {
        $user = $this->userProfileService->updateGeneral(Auth::user()->id, $request);

        return response()->json($user);
    }
}
