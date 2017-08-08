<?php

namespace App\Http\Controllers\Auth;

use App\Http\Requests\RegisterUserRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\VerifyUserRequest;
use App\Repositories\UserRepository;
use App\Services\RegisterUserService;

class RegisterController extends Controller
{
    private $registerUserService;
    private $userRepository;

    public function __construct(RegisterUserService $registerUserService, UserRepository $userRepository)
    {
        $this->registerUserService = $registerUserService;
        $this->userRepository = $userRepository;
    }

    /**
     * @param RegisterUserRequest $request
     */
    public function register(RegisterUserRequest $request)
    {
        $user = $this->registerUserService->register($request->all());

        $this->userRepository->save($user);

        $user->sendConfirmationEmail();
    }

    /**
     * @param VerifyUserRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function verify(VerifyUserRequest $request)
    {
        $user = $this->registerUserService->findUserToVerify($request->all());

        if (!$user) {
            return response()->json(['token' => ['User cant be verified']], 422);
        }

        $user->verify();

        return response()->json(['success' => true]);
    }
}
