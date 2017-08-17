<?php

namespace App\Http\Controllers\User;

use Auth;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
//use App\Services\Contracts\PasswordService;
//use App\Http\Requests\UpdatePasswordRequest;

class AvatarController extends Controller
{
    /**
     * @var \App\Services\PasswordService
     */
    private $userAvatarService;

    /**
     * @param \App\Services\PasswordService $passwordService
     */
    /*public function __construct(PasswordService $userAvatarService)
    {
        $this->userAvatarService = $userAvatarService;
    }*/

    /**
     * Update the current user avatar.
     *
     * @param \App\Http\Requests\UpdatePasswordRequest $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request): JsonResponse
    {
        return response()->json($request->file('avatar'));

        //$this->passwordService->update(Auth::user()->id, $request);

        return response()->json();
    }
}
