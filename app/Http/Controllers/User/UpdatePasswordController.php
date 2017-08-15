<?php

namespace App\Http\Controllers\User;

use Auth;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Services\Contracts\PasswordService;
use App\Http\Requests\UpdatePasswordRequest;

class UpdatePasswordController extends Controller
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
     * Change the user profile password.
     *
     * @param \App\Http\Requests\UpdatePasswordRequest $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdatePasswordRequest $request): JsonResponse
    {
        return response()->json($request->all());

        $res = $this->passwordService->update(Auth::user()->id, $request);

        return response()->json($res);
    }
}
