<?php

namespace App\Http\Controllers\User;

use Auth;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateUserAvatarRequest;
use App\Services\Contracts\UserProfileService;
use Spatie\MediaLibrary\Exceptions\FileCannotBeAdded;

class AvatarController extends Controller
{
    /**
     * @var \App\Services\Contracts\UserProfileService
     */
    private $userProfileService;

    /**
     * @param \App\Services\Contracts\UserProfileService $userProfileService
     */
    public function __construct(UserProfileService $userProfileService)
    {
        $this->userProfileService = $userProfileService;
    }

    /**
     * Update the current user avatar.
     *
     * @param \App\Http\Requests\UpdateUserAvatarRequest $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateUserAvatarRequest $request): JsonResponse
    {
        try {
            $avatar = $this->userProfileService->updateAvatar(Auth::user()->id, $request);

        } catch (FileCannotBeAdded $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        }

        return response()->json($avatar);
    }
}
