<?php

namespace App\Http\Controllers\Api\Chat;

use App\User;
use App\Models\ChatMessage;
use Illuminate\Http\Request;
use App\Events\Chat\NewMessage;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function message(Request $request, User $user)
    {
        $sender = Auth::user();

        $chatMessage = new ChatMessage();
        $chatMessage->message = $request->get('message');
        $chatMessage->sender_id = $sender->id;
        $chatMessage->recipient_id = $user->id;
        $chatMessage->save();

        broadcast(new NewMessage($chatMessage));
    }
}
