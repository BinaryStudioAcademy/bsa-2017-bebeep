<?php

namespace App\Http\Controllers\Api\Chat;

use App\User;
use App\Models\ChatMessage;
use App\Events\Chat\NewMessage;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
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

        return fractal()->item($chatMessage, new ChatMessageTransformer())->respond();
    }

    public function getChatMessages(User $user)
    {
        $recipient = Auth::user();

        $messages = $this->chatMessageService->getUserMessages($recipient, $user);

        return fractal()->collection($messages, new ChatMessageTransformer())->respond();
    }

    public function destroy(ChatMessage $message)
    {
        $result = $this->chatMessageService->deleteUserMessage($message);

        return response()->json($result);
    }
}
