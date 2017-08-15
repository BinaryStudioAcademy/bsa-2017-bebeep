<?php

namespace App\Services\Requests;

interface UpdateUserProfileRequest
{
    public function getFirstName() : string;

    public function getLastName() : string;

    public function getEmail() : string;

    public function getPhone() : string;

    public function getBirthDate() : string;

    public function getAboutMe() : ?string;

    public function getPermissions() : int;
}
