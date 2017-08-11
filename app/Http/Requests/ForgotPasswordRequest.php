<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use \App\Services\Requests\ForgotPasswordRequest as ForgotPasswordRequestInterface;
use Illuminate\Http\Request;

class ForgotPasswordRequest extends FormRequest implements ForgotPasswordRequestInterface
{

    public function __construct(Request $request)
    {
        parent::__construct(
            $request->query->all(),
            $request->request->all(),
            $request->attributes->all(),
            $request->cookies->all(),
            $request->files->all(),
            $request->server->all(),
            $request->content
        );
    }

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'email' => "required|email|exists:users,email",
        ];
    }

    public function getEmail()
    {
        return $this->get('email');
    }
}