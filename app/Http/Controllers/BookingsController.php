<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateBookingRequest;
use App\Models\Trip;
use App\Services\BookingService;
use Illuminate\Support\Facades\Auth;

class BookingsController extends Controller
{
    private $bookingService;

    public function __construct(BookingService $bookingService)
    {
        $this->bookingService = $bookingService;
    }

    public function create(Trip $trip, CreateBookingRequest $request)
    {
        try {
            $this->bookingService->create($trip, $request, Auth::user());
        } catch (\Exception $e) {
            return response()->json(['errors' => [$e->getMessage()]], 422);
        }

        return response()->json(['success' => true]);
    }
}
