<?php

namespace App\Http\Controllers\Auth;

use App\Exceptions\User\VerifyException;
use App\Http\Requests\RegisterUserRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\VerifyUserRequest;
use App\Services\RegisterUserService;

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

        return response()->json(['success' => true, 'user' => $user]);
    }

    /**
     * @param VerifyUserRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function verify(VerifyUserRequest $request)
    {
        try {
            $this->registerUserService->verify($request);
        } catch (VerifyException $e) {
            return response()->json(['token' => [$e->getMessage()]], 422);
        };

        return response()->json(['success' => true]);
    }
}
