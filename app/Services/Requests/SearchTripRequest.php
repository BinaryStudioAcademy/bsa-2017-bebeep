<?php

namespace App\Services\Requests;

use Carbon\Carbon;

interface SearchTripRequest
{
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

    /**
     * Date of start trip.
     *
     * @return Carbon
     */
    public function getStartAt() : Carbon;

    /**
     * Limit items of page.
     *
     * @return int
     */
    public function getLimit() : int;

    /**
     * Page number.
     *
     * @return int
     */
    public function getPage() : int;

    /**
     * Sort field.
     *
     * @return string
     */
    public function getSort() : string;

    /**
     * Sort order.
     *
     * @return string
     */
    public function getOrder() : string;

    /**
     * Sort order ascending.
     *
     * @return bool
     */
    public function isAsc() : bool;

    /**
     * Sort order descending.
     *
     * @return bool
     */
    public function isDesc() : bool;

    /**
     * Get filter array.
     *
     * @return array
     */
    public function getFilter() : array;

    /**
     * @return int
     */
    public function getMinTime() : int;

    /**
     * @return int
     */
    public function getMaxTime() : int;

    /**
     * @return int
     */
    public function getMinPrice() : int;

    /**
     * @return int
     */
    public function getMaxPrice() : int;
}
