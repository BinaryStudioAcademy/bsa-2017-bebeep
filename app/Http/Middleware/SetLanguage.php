<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use \Closure;
use Illuminate\Support\Facades\App;

class SetLanguage
{

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if ($request->header('user-language'))
        {
            App::setLocale($request->header('user-language'));
        }

        return $next($request);
    }
}
