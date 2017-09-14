<?php

namespace App\Http\Controllers\Api\Subscription;

use App\Models\Subscription;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\CreateSubscriptionRequest;
use App\Services\Contracts\SubscriptionsService;
use App\Transformers\Subscriptions\SubscriptionTransformer;
use App\Http\Requests\Subscriptions\EditSubscriptionRequest;
use App\Http\Requests\Subscriptions\StatusSubscriptionRequest;
use App\Exceptions\Subscriptions\SubscriptionEmailExistsException;

class SubscriptionsController extends Controller
{
    /**
     * @var SubscriptionsService
     */
    private $subscriptionsService;

    public function __construct(SubscriptionsService $subscriptionsService)
    {
        $this->subscriptionsService = $subscriptionsService;
    }

    public function index()
    {
        $subscriptions = $this->subscriptionsService->getByUser(Auth::user());

        return fractal()
            ->collection($subscriptions, new SubscriptionTransformer())
            ->parseIncludes('filters')
            ->respond();
    }

    public function delete(Subscription $subscription)
    {
        $this->subscriptionsService->delete($subscription);

        return response()->json([], 200);
    }

    public function edit(EditSubscriptionRequest $request, Subscription $subscription)
    {
        $subscription = $this->subscriptionsService->edit($request, $subscription);

        return fractal()
            ->item($subscription, new SubscriptionTransformer())
            ->parseIncludes('filters')
            ->respond();
    }

    public function status(StatusSubscriptionRequest $request, Subscription $subscription)
    {
        $this->subscriptionsService->changeStatus($request, $subscription);

        return response()->json([], 200);
    }

    /**
     * @param CreateSubscriptionRequest $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CreateSubscriptionRequest $request)
    {
        try {
            $subscription = $this->subscriptionsService->create($request);

            return response()->json($subscription);
        } catch (SubscriptionEmailExistsException $e) {
            return response()->json([
                'errors' => [
                    'email' => [
                        'message' => $e->getMessage(),
                        'user_exists' => true
                    ]
                ]
            ], 422);
        }
    }
}
