<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class UserProfileController extends Controller
{
    private $userProfileService;

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

        return response()->json(['user' => $user]);
    }

    /**
     * @param RegisterUserRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    /*
    public function register(RegisterUserRequest $request)
    {
        $user = $this->registerUserService->register($request);

        return response()->json(['user' => $user]);
    }
    */

    /**
     * @param VerifyUserRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    /*
    public function verify(VerifyUserRequest $request)
    {
        try {
            $authToken = $this->registerUserService->verify($request);
        } catch (VerifyException $e) {
            return response()->json(['token' => [$e->getMessage()]], 422);
        };

        return response()->json(['token' => $authToken]);
    }
    */
}
