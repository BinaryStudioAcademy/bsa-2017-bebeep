<?php

namespace App\Http\Requests\Contracts;


interface GetTripsListRequest
{
    /**
     * Return user id from request.
     * @return int
     */
    public function getUserId() :int;
}