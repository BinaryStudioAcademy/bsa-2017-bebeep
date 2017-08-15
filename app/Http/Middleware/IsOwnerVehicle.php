<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Contracts\Routing\ResponseFactory;
use Tymon\JWTAuth\JWTAuth;
use Tymon\JWTAuth\Middleware\BaseMiddleware;
use App\Services\CarService;

class IsOwnerVehicle extends BaseMiddleware
{
    protected $carService;
    public function __construct(ResponseFactory $response,
                                Dispatcher $events,
                                JWTAuth $auth,
                                CarService $carService)
    {
        parent::__construct($response, $events, $auth);
        $this->carService = $carService;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $requestId = $request->route()->parameters()['car'];
        if ($this->carService->getById($requestId)->user_id !== $request->user()->id ){
            return response()->json(['message' => 'You are not owner vehicle!'], 403);
        }
        return $next($request);
    }
}
