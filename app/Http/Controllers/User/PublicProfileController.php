<?php

namespace App\Http\Controllers\User;

use Auth;
use App\User;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Services\Contracts\UserPublicProfileService;
use App\Transformers\User\DriverPublicProfileTransformer;
use App\Transformers\User\PassengerPublicProfileTransformer;

class PublicProfileController extends Controller
{
    /**
     * @var \App\Services\Contracts\UserPublicProfileService
     */
    private $userPublicProfileService;

    /**
     * @param \App\Services\Contracts\UserPublicProfileService $userPublicProfileService
     */
    public function __construct(UserPublicProfileService $userPublicProfileService)
    {
        $this->userPublicProfileService = $userPublicProfileService;
    }

    /**
     * Get and show the driver public profile data.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function showDriver(User $user) : JsonResponse
    {
        $user = $this->userPublicProfileService->getDriverProfile($user);

        if ($user === null) {
            return response()->json([], 404);
        }

        return fractal($user, new DriverPublicProfileTransformer())->respond();
    }

    /**
     * Get and show the passenger public profile data.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function showPassenger(User $user) : JsonResponse
    {
        $user = $this->userPublicProfileService->getPassengerProfile($user);

        if ($user === null) {
            return response()->json([], 404);
        }

        return fractal($user, new PassengerPublicProfileTransformer())->respond();
    }
}
