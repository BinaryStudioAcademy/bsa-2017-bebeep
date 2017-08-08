<?php

namespace App\Http\Controllers;

use App\Exceptions\Auth\CreateTokenException;
use App\Exceptions\Auth\InvalidCredentialsException;
use App\Exceptions\Auth\UserNotFoundException;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\TokenRequest;
use App\Services\AuthUserService;
use Tymon\JWTAuth\JWTAuth;

class ApiAuthController extends Controller
{
    /**
     * @var AuthUserService
     */
    private $authUserService;

    /**
     * ApiAuthController constructor.
     *
     * @param AuthUserService $authUserService
     */
    public function __construct(AuthUserService $authUserService)
    {
        $this->authUserService = $authUserService;
    }

    /**
     * Authenticate user by JWT
     *
     * @param LoginRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function authenticate(LoginRequest $request)
    {
        try {
            $token = $this->authUserService->auth($request);

            return response()->json(['token' => $token], 200);

        } catch (UserNotFoundException | InvalidCredentialsException | CreateTokenException $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'code' => $e->getCode()
            ]);
        }
    }

    /**
     * Logout
     *
     * @param TokenRequest $request
     * @param JWTAuth $JWTAuth
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(TokenRequest $request, JWTAuth $JWTAuth)
    {
        if($JWTAuth->setToken($request->token)->invalidate()) {
            return response()->json([
                'status' => 'ok',
                'message' => 'Token was turned down'
            ]);
        }
    }
}