<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
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
