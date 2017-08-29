<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Services\RegisterUserService;
use App\Exceptions\User\VerifyException;
use App\Http\Requests\VerifyUserRequest;
use App\Http\Requests\RegisterUserRequest;

class RegisterController extends Controller
{
    /**
     * @var \App\Services\RegisterUserService
     */
    private $registerUserService;

    /**
     * @param \App\Services\RegisterUserService $registerUserService
     */
    public function __construct(RegisterUserService $registerUserService)
    {
        $this->registerUserService = $registerUserService;
    }

    /**
     * @param \App\Http\Requests\RegisterUserRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(RegisterUserRequest $request): JsonResponse
    {
        $token = $this->registerUserService->register($request);

        return response()->json(['token' => $token]);
    }

    /**
     * @param \App\Http\Requests\VerifyUserRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function verify(VerifyUserRequest $request): JsonResponse
    {
        try {
            $authToken = $this->registerUserService->verify($request);
        } catch (VerifyException $e) {
            return response()->json(['token' => [$e->getMessage()]], 422);
        }

        return response()->json(['token' => $authToken]);
    }
}
