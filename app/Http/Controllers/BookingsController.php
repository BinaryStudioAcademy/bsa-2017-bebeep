<?php

namespace App\Http\Controllers;

use App\Http\Requests\CancelBookingRequest;
use App\Models\Trip;
use App\Models\Booking;
use App\Services\BookingService;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\BookingStatusRequest;
use App\Http\Requests\CreateBookingRequest;
use App\Exceptions\Booking\BookingConfirmException;

class BookingsController extends Controller
{
    private $bookingService;

    public function __construct(BookingService $bookingService)
    {
        $this->bookingService = $bookingService;
    }

    /**
     * @param Trip $trip
     * @param CreateBookingRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Trip $trip, CreateBookingRequest $request)
    {
        try {
            $booking = $this->bookingService->create($trip, $request, Auth::user());
        } catch (\Exception $e) {
            return response()->json(['errors' => [$e->getMessage()]], 422);
        }

        return response()->json($booking);
    }

    /**
     * @param BookingStatusRequest $request
     * @param Trip $trip
     * @param Booking $booking
     * @return \Illuminate\Http\JsonResponse
     */
    public function status(BookingStatusRequest $request, Trip $trip, Booking $booking)
    {
        try {
            $this->bookingService->changeStatus($request, $trip, $booking);
        } catch (BookingConfirmException $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        }

        return response()->json();
    }

    /**
     * @param CancelBookingRequest $request
     * @param Booking $booking
     * @return \Illuminate\Http\JsonResponse
     */
    public function cancel(CancelBookingRequest $request, Booking $booking)
    {
        try {
            $booking = $this->bookingService->cancel($booking, Auth::user());
        } catch (\Exception $e) {
            return response()->json(['errors' => [$e->getMessage()]], 422);
        }

        return response()->json($booking);
    }
}
