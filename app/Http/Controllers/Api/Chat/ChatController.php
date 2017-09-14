<?php

namespace App\Http\Controllers\Api\Chat;

use App\User;
use App\Events\Chat\NewMessage;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Services\Chat\ChatMessageService;
use App\Http\Requests\Chat\MessageRequest;
use App\Transformers\Chat\ChatMessageTransformer;

class ChatController extends Controller
{
    /**
     * @var ChatMessageService
     */
    private $chatMessageService;

    public function __construct(ChatMessageService $chatMessageService)
    {
        $this->chatMessageService = $chatMessageService;
    }

    public function message(MessageRequest $request, User $user)
    {
        $sender = Auth::user();
        $chatMessage = $this->chatMessageService->addMessage($request, $sender, $user);

        broadcast(new NewMessage($chatMessage));

        return fractal()->item($chatMessage, new ChatMessageTransformer());
    }

    public function getMessages()
    {
        $user = Auth::user();

        $messages = $this->chatMessageService->getUserMessages($user);

        return fractal()->collection($messages, new ChatMessageTransformer())->respond();
    }
}
