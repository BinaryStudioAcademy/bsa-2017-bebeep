<?php

namespace App\Http\Controllers\User;

use Auth;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Transformers\User\ProfileTransformer;
use App\Services\Contracts\UserProfileService;
use App\Http\Requests\UpdateUserProfileRequest;

class ProfileController extends Controller
{
    /**
     * @var \App\Services\Contracts\UserProfileService
     */
    private $userProfileService;

    /**
     * @param \App\Services\Contracts\UserProfileService $userProfileService
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
        $user = $this->userProfileService->getGeneral(Auth::user());

        return fractal($user, new ProfileTransformer())->respond();
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
        $user = $this->userProfileService->updateGeneral(Auth::user(), $request);

        return fractal($user, new ProfileTransformer())->respond();
    }
}
