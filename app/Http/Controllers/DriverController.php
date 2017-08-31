<?php

namespace App\Http\Controllers;

use App\User;

class DriverController extends Controller
{
    public function getReviews(User $user)
    {
        return response()->json([]);
    }
}

