<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\RegisterUserService;
use App\Exceptions\User\VerifyException;
use App\Http\Requests\VerifyUserRequest;
use App\Http\Requests\RegisterUserRequest;

class RegisterController extends Controller
{
    private $registerUserService;

    public function __construct(RegisterUserService $registerUserService)
    {
        $this->registerUserService = $registerUserService;
    }

    /**
     * @param RegisterUserRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(RegisterUserRequest $request)
    {
        $user = $this->registerUserService->register($request);

        return response()->json(['user' => $user]);
    }

    /**
     * @param VerifyUserRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function verify(VerifyUserRequest $request)
    {
        try {
            $authToken = $this->registerUserService->verify($request);
        } catch (VerifyException $e) {
            return response()->json(['token' => [$e->getMessage()]], 422);
        }

        return response()->json(['token' => $authToken]);
    }
}
