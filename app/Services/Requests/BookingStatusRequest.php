<?php

namespace App\Services\Requests;

interface BookingStatusRequest
{
    public function getStatus() : string;
}