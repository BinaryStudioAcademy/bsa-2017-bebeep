<?php

namespace App\Http\Controllers\Api\Car;

use App\Models\Vehicle;
use App\Services\CarService;
use App\Http\Requests\CreateCarRequest;
use App\Http\Requests\UpdateCarRequest;
use App\Http\Controllers\Controller;


class CarController extends Controller
{
    private $carService;

    public function __construct(CarService $carService)
    {
        $this->carService = $carService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(
            $this->carService->getAll()->map(function(Vehicle $cars){
                return $cars;
            })
        );
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
     * @param CreateCarRequest $request
     * @return Vehicle
     */
    public function store(CreateCarRequest $request)
    {
//        return $request->all();
        return $car = $this->carService->create($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
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
     * @param CreateCarRequest $request
     * @param $id
     * @return Vehicle
     */
    public function update(CreateCarRequest $request, $id)
    {
        return $this->carService->update($request, $id);
    }

    /**
     ** Remove the specified resource from storage.
     *
     * @param $id
     * @return int
     */
    public function destroy($id)
    {
        return $this->carService->destroy($id);
    }
}
