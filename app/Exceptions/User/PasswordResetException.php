<?php

namespace App\Exceptions\User;

use Exception;

class PasswordResetException extends \Exception
{
    const INVALID_PASSWORD = 1;
    const INVALID_TOKEN = 2;
    const INVALID_USER = 3;

    protected $field;

    public function __construct($message = "", $code = 0, Exception $previous = null)
    {
        parent::__construct($message, $code, $previous);
        $this->setField($code);
    }

    public function setField(int $code)
    {
        switch ($code) {
            case self::INVALID_USER:
                $this->field = 'email';
                break;
            case self::INVALID_TOKEN:
                $this->field = 'token';
                break;
            case self::INVALID_PASSWORD:
                $this->field = 'password';
                break;
            default:
                $this->field = "reset_password";
        };
    }

    public function getField()
    {
        return $this->field;
    }
}