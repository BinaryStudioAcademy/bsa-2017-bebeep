<?php

namespace App\Services\Requests;

interface BookingListRequest
{
    /**
     * @return int
     */
    public function getLimit() : int;
}
