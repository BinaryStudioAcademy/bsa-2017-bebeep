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
     * @var \App\Services\Contracts\PasswordService
     */
    private $passwordService;

    /**
     * @param \App\Services\Contracts\PasswordService $passwordService
     */
    public function __construct(PasswordService $passwordService)
    {
        $this->passwordService = $passwordService;
    }

    /**
     * Update the current user password.
     *
     * @param \App\Http\Requests\UpdatePasswordRequest $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdatePasswordRequest $request): JsonResponse
    {
        $this->passwordService->update(Auth::user()->id, $request);

        return response()->json();
    }
}
