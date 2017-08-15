<?php

namespace App\Http\Controllers\User;

use Auth;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Services\Contracts\PasswordService;
use App\Http\Requests\PasswordChangeRequest;

class PasswordUpdateController extends Controller
{
    /**
     * @var \App\Services\PasswordService
     */
    private $passwordService;

    /**
     * @param \App\Services\PasswordService $passwordService
     */
    public function __construct(PasswordService $passwordService)
    {
        $this->passwordService = $passwordService;
    }

    /**
     * Change the user account password.
     *
     * @param \App\Http\Requests\PasswordChangeRequest $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(PasswordChangeRequest $request): JsonResponse
    {
        return response()->json($request);

        $res = $this->passwordService->change(Auth::user()->id, $request);

        return response()->json($res);
    }
}
