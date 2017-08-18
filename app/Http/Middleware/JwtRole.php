<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Middleware\BaseMiddleware;

class JwtRole extends BaseMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @param $roles
     * @return mixed
     */
    public function handle($request, Closure $next, $roles)
    {
        if (! Auth::user()) {
            return response()->json(['message' => 'You are not logged in!'], 422);
        }

        $roles = is_array($roles)
            ? $roles
            : explode('|', $roles);

        foreach ($roles as $role) {
            if (! Auth::user()->hasRole($role)) {
                return response()->json(['message' => 'You have not permissions!'], 403);
            }
        }

        return $next($request);
    }
}
