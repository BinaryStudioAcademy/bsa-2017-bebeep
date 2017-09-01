<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Middleware\BaseMiddleware;

class JwtAuth extends BaseMiddleware
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
            $user = $this->auth->authenticate($token);
        }

        return $next($request);
    }
}
