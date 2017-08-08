<?php

namespace App\Http\Controllers\Auth;

use App\Http\Requests\RegisterUserRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\VerifyUserRequest;
use App\Repositories\UserRepository;
use App\Exceptions\User\InvalidTokenException;
use App\Exceptions\User\VerifyException;

class RegisterController extends Controller
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function register(RegisterUserRequest $request)
    {
        $this->userRepository->create($request->all());
    }

    public function verify(VerifyUserRequest $request)
    {
        $user = $this->userRepository->findByField('email', $request->email)->first();
        try {
            $user->verify($request->token);
            return response()->json(['success' => true]);
        } catch (InvalidTokenException $e) {
            return response()->json(['token' => [$e->getMessage()]], 422);
        } catch (VerifyException $e) {
            return response()->json(['token' => [$e->getMessage()]], 422);
        }
    }
}
