<?php

namespace App\Http\Controllers\Api\Car;

use App\Models\Vehicle;
use App\Services\CarService;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\SaveCarRequest;

class CarController extends Controller
{
    private $carService;

    /**
     * CarController constructor.
     *
     * @param CarService $carService
     */
    public function __construct(CarService $carService)
    {
        $this->carService = $carService;

        $this->middleware('is.vehicle.owner',
            ['only' => ['show', 'edit', 'update', 'destroy']]);
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function index(Request $request)
    {
        return $this->carService->getAll($request);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return bool
     */
    public function create()
    {
        return true;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param SaveCarRequest $request
     * @return Vehicle|\Illuminate\Http\JsonResponse
     */
    public function store(SaveCarRequest $request)
    {
        return $car = $this->carService->create($request);
    }

    /**
     * Display the specified resource.
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse|mixed
     */
    public function show($id)
    {
        return $this->carService->getById($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param $id
     * @return mixed
     */
    public function edit($id)
    {
        return $this->carService->getById($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param SaveCarRequest $request
     * @param $id
     * @return Vehicle|\Illuminate\Http\JsonResponse
     */
    public function update(SaveCarRequest $request, $id)
    {
        return $this->carService->update($request, $id);
    }

    /**
     ** Remove the specified resource from storage.
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse|int
     */
    public function destroy($id)
    {
        if ($this->carService->destroy($id)) {
            return response()->json('', 204);
        } else {
            return response()->json('', 404);
        }
    }
}
