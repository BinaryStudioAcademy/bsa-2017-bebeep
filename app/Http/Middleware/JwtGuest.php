<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Middleware\BaseMiddleware;

class JwtGuest extends BaseMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $token = $this->auth->setRequest($request)->getToken();

        if ($token) {
            return response()->json(['message' => 'User already logged in!'], 422);
        }

        return $next($request);
    }
}
