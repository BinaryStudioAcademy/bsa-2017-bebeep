<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\AuthSessionService;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Exceptions\Auth\UserNotFoundException;
use App\Transformers\User\SessionDataTransformer;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class SessionController extends Controller
{
    /**
     * @var \App\Services\AuthSessionService
     */
    private $authSessionService;

    /**
     * @param \App\Services\AuthSessionService $authSessionService
     */
    public function __construct(AuthSessionService $authSessionService)
    {
        $this->authSessionService = $authSessionService;
    }

    /**
     * Get the session user data.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSessionUser()
    {
        try {
            $user = $this->authSessionService->getUserData();

            return fractal($user, new SessionDataTransformer())->respond();

        } catch (UserNotFoundException $e) {
            return response()->json([$e->getMessage()], 404);

        } catch (TokenExpiredException $e) {
            return response()->json(['token_expired'], $e->getStatusCode());

        } catch (TokenInvalidException $e) {
            return response()->json(['token_invalid'], $e->getStatusCode());

        } catch (JWTException $e) {
            return response()->json(['token_absent'], $e->getStatusCode());
        }
    }
}
