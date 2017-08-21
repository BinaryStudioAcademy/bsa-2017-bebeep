<?php

namespace App\Http\Controllers;

use App\Http\Requests\BookingStatusRequest;
use App\Models\Booking;
use App\Models\Trip;
use App\Services\Contracts\BookingService;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    protected $bookingService;

    public function __construct(BookingService $bookingService)
    {
        $this->bookingService = $bookingService;
    }

    public function status(BookingStatusRequest $request, Trip $trip, Booking $booking)
    {
        $this->bookingService->changeStatus($request, $booking);
        return response()->json();
    }
}
