<?php

namespace App\Http\Controllers;

use App\Exceptions\User\VerifyException;
use App\Http\Requests\ForgotPasswordRequest;
use App\Services\PasswordService;
use App\Services\Requests\AuthorizationRequest;
use Illuminate\Http\Request;

class AuthorizationController extends Controller {

    protected $passwordService;

    public function __construct(PasswordService $passwordService)
    {
        $this->passwordService = $passwordService;
    }

    public function index(Request $request)
    {
        switch($request->get('type')) {
            case 'reset-password':
                $passwordRequest = new ForgotPasswordRequest($request);
                $this->validate($request, $passwordRequest->rules());
                try {
                    $this->passwordService->forgot($passwordRequest);
                } catch (VerifyException $e) {
                    return response()->json(['email' => [$e->getMessage()]], 422);
                }
                break;
        }
    }
}