<?php

namespace App\Http\Controllers\Auth;

use App\Services\AuthUserService;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;

class SessionController extends Controller
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

    public function getSessionToken(\Tymon\JWTAuth\JWTAuth $JWTAuth)
    {
        try {
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json('', 404);
            }

            $customClaims = [
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'avatar' => $user->getAvatarUrl(),
                'permissions' => $user->permissions,
            ];

            return response()->json(['user' => $customClaims]);

        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

            return response()->json(['token_expired'], $e->getStatusCode());

        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

            return response()->json(['token_invalid'], $e->getStatusCode());

        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

            return response()->json(['token_absent'], $e->getStatusCode());
        }
    }
}
