<?php

namespace App\Http\Middleware;

use Closure;
use App\Services\CarService;
use Illuminate\Support\Facades\Auth;

class IsVehicleOwner
{
    protected $carService;

    /**
     * IsVehicleOwner constructor.
     *
     * @param CarService $carService
     */
    public function __construct(CarService $carService)
    {
        $this->carService = $carService;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $requestId = $request->route()->parameters()['car'];
        if ($this->carService->getById($requestId)->user_id !== Auth::user()->id) {
            return response()->json(['message' => 'You are not owner vehicle!'], 403);
        }
        return $next($request);
    }
}
