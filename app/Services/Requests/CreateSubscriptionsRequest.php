<?php

namespace App\Services\Requests;

use Carbon\Carbon;

interface CreateSubscriptionsRequest
{
    /**
     * Google object place From
     *
     * @return array
     */
    public function getFrom(): array;

    /**
     * Google object place To
     *
     * @return array
     */
    public function getTo(): array;

    /**
     * Get filter array.
     *
     * @return array
     */
    public function getFilters(): array;

    /**
     * Date of start trip.
     *
     * @return Carbon
     */
    public function getStartAt(): Carbon;

    /**
     * @return string
     */
    public function getEmail(): string ;

    /**
     * Latitude 'From' point.
     *
     * @return mixed
     */
    public function getFromLat() : float;

    /**
     * Longitude 'From' point.
     *
     * @return mixed
     */
    public function getFromLng() : float;

    /**
     * Latitude 'To' point.
     *
     * @return mixed
     */
    public function getToLat() : float;

    /**
     * Longitude 'To' point.
     *
     * @return mixed
     */
    public function getToLng() : float;
}