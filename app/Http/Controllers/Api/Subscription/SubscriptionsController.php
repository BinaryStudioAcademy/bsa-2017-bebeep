<?php

namespace App\Http\Controllers\Api\Subscription;

use App\Http\Requests\CreateSubscriptionRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SubscriptionsController extends Controller
{

    /**
     * @param CreateSubscriptionRequest $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CreateSubscriptionRequest $request)
    {
        return response()->json($request);
    }

}
