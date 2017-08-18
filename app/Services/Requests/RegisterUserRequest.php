<?php

namespace App\Services\Requests;

interface RegisterUserRequest
{
    public function getFirstName(): string;

    public function getLastName(): string;

    public function getEmail(): string;

    public function getPhone(): string;

    public function getBirthDate(): ?string;

    public function getPass(): string;

    public function getPermissions(): int;
}
