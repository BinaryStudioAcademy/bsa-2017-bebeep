<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Transformers\User\SessionDataTransformer;

class SessionController extends Controller
{
    /**
     * Get the session user data.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSessionUser()
    {
        return fractal(Auth::user(), new SessionDataTransformer())->respond();
    }
}
