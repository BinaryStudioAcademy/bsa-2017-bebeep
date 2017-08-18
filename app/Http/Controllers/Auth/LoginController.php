<?php

namespace App\Http\Controllers\Auth;

use Tymon\JWTAuth\JWTAuth;
use App\Services\AuthUserService;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\TokenRequest;
use App\Http\Controllers\Controller;
use App\Exceptions\Auth\CreateTokenException;
use App\Exceptions\Auth\UserNotFoundException;
use App\Exceptions\Auth\UserNotVerifiedException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use App\Exceptions\Auth\InvalidCredentialsException;

class LoginController extends Controller
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
     * Authenticate user by JWT.
     *
     * @param LoginRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function authorization(LoginRequest $request)
    {
        try {
            $token = $this->authUserService->auth($request);

            return response()->json(['token' => $token], 200);
        } catch (UserNotFoundException $e) {
            return response()->json(['error' => $e->getMessage()], 404);
        } catch (UserNotVerifiedException $e) {
            return response()->json(['error' => $e->getMessage()], 401);
        } catch (InvalidCredentialsException $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        } catch (CreateTokenException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        }
    }

    /**
     * Logout.
     *
     * @param TokenRequest $request
     * @param JWTAuth $JWTAuth
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(TokenRequest $request, JWTAuth $JWTAuth)
    {
        try {
            $this->authUserService->logout($request, $JWTAuth);

            return response()->json([
                'status' => 'ok',
                'message' => 'token was turned down',
            ]);
        } catch (TokenInvalidException $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'code' => $e->getStatusCode(),
            ], $e->getStatusCode());
        }
    }
}
