<?php

namespace App\Services\Permission;

interface PermissionInterface
{
    public function canViewCar($userId) : bool;
    public function canAddCar() : bool;
    public function canEditCar($userId) : bool;
    public function canDeleteCar($userId) : bool;
}