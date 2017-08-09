<?php


namespace App\Services\Requests;

interface CreateCarRequest
{
    public function getBrand() : string;
    public function getModel() : string;
    public function getColor() : string;
    public function getBody() : string;
    public function getSeats() : int;
    public function getYear() : int;
}