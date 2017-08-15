<?php

namespace App\Services;

use App\Services\Permission\PermissionInterface;
use Illuminate\Support\Facades\Auth;

class PermissionService extends Auth implements PermissionInterface
{
    /**
     * @param $userId
     * @return bool
     */
    public function canViewCar($userId): bool
    {
        if ($this::user()->id === $userId) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @return bool
     */
    public function canAddCar(): bool
    {
        if ($this::user()->permissions === 2) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @param $userId
     * @return bool
     */
    public function canEditCar($userId): bool
    {
        if ($this::user()->id === $userId) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @param $userId
     * @return bool
     */
    public function canDeleteCar($userId): bool
    {
        if ($this::user()->id === $userId) {
            return true;
        } else {
            return false;
        }
    }
}