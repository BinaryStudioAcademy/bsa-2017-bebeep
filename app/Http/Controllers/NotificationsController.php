<?php

namespace App\Http\Controllers;

use InvalidArgumentException;
use Illuminate\Support\Facades\Auth;
use App\Services\Contracts\NotificationService;
use App\Http\Requests\NotificationStatusRequest;
use Illuminate\Notifications\DatabaseNotification;
use App\Exceptions\Notifications\NotBelongUserException;
use App\Transformers\Notifications\NotificationTransformer;

class NotificationsController extends Controller
{
    /**
     * @var NotificationService
     */
    private $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $notifications = $this->notificationService->getAll(Auth::user());

        return fractal()->collection($notifications, new NotificationTransformer())->respond();
    }

    /**
     * @param NotificationStatusRequest $request
     * @param DatabaseNotification $databaseNotification
     * @return \Illuminate\Http\JsonResponse
     */
    public function changeStatus(NotificationStatusRequest $request, DatabaseNotification $databaseNotification)
    {
        try {
            $this->notificationService->changeStatus($request, Auth::user(), $databaseNotification);
        } catch (InvalidArgumentException $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        } catch (NotBelongUserException $e) {
            return response()->json(['message' => $e->getMessage()], 403);
        }

        return response()->json([], 200);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUnread()
    {
        $count = $this->notificationService->countUnread(Auth::user());

        return response()->json($count);
    }
}
