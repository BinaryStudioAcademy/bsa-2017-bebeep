<?php

namespace App\Services\Requests\Chat;

interface UsersSearchRequest
{
    /**
     * Get the search user email.
     *
     * @return string
     */
    public function getEmail(): string;

    /**
     * Get the search user first name.
     *
     * @return string
     */
    public function getFirstName(): string;

    /**
     * Get the search user last name.
     *
     * @return string
     */
    public function getLastName(): string;

    /**
     * Check, whether the query params "first name" and "last name" are identical.
     *
     * @return bool
     */
    public function areNamesParamsIdentical(): bool;
}
