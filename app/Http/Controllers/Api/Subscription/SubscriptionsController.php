<?php

namespace App\Http\Controllers\Api\Subscription;

use App\Models\Subscription;
use App\Transformers\Subscriptions\SubscriptionTransformer;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Services\Contracts\SubscriptionsService;
use App\Http\Requests\Subscriptions\EditSubscriptionRequest;
use App\Http\Requests\Subscriptions\StatusSubscriptionRequest;

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
    }

    public function edit(EditSubscriptionRequest $request, Subscription $subscription)
    {
        $this->subscriptionsService->edit($request, $subscription);
    }

    public function status(StatusSubscriptionRequest $request, Subscription $subscription)
    {
        $this->subscriptionsService->changeStatus($request, $subscription);
    }
}
