<?php

namespace App\Http\Controllers;

use App\Models\Trip;
use App\Models\Booking;
use App\Services\Contracts\BookingService;
use App\Http\Requests\BookingStatusRequest;
use App\Exceptions\Booking\BookingConfirmException;

class BookingController extends Controller
{
    protected $bookingService;

    public function __construct(BookingService $bookingService)
    {
        $this->bookingService = $bookingService;
    }

    public function status(BookingStatusRequest $request, Trip $trip, Booking $booking)
    {
        try {
            $this->bookingService->changeStatus($request, $trip, $booking);
        } catch (BookingConfirmException $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        }

        return response()->json();
    }
}
