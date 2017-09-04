<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Services\Contracts\NotificationService;
use Illuminate\Notifications\DatabaseNotification;
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
     * @param DatabaseNotification $databaseNotification
     * @return \Illuminate\Http\JsonResponse
     */
    public function read(DatabaseNotification $databaseNotification)
    {
        if ($this->notificationService->markAsRead(Auth::user(), $databaseNotification)) {
            return response()->json([], 200);
        } else {
            return response()->json([], 404);
        }
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
