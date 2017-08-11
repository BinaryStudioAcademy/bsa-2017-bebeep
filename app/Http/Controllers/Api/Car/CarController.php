<?php

namespace App\Http\Controllers\Api\Car;

use App\Models\Vehicle;
use App\Services\CarService;
use App\Services\PermissionService;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreateCarRequest;
use Illuminate\Support\Facades\Auth;

class CarController extends Controller
{
    private $carService;
    private $permissionService;

    public function __construct(CarService $carService, PermissionService $permissionService)
    {
        $this->carService = $carService;
        $this->permissionService = $permissionService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
//        return response()->json(
//            $this->carService->getAll()->map(function (Vehicle $cars) {
//                return $cars;
//            })
//        );
        return $this->carService->getAll();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return bool
     */
    public function create()
    {
        return $this->permissionService->canAddCar();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CreateCarRequest $request
     * @return Vehicle|\Illuminate\Http\JsonResponse
     */
    public function store(CreateCarRequest $request)
    {
        if ($this->permissionService->canAddCar()) {
            return $car = $this->carService->create($request);
        } else {
            return $this->accessDenied();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $vehicle = $this->carService->getById($id);

        if ($this->permissionService->canViewCar($vehicle->user_id)) {
            return $vehicle;
        } else {
            return $this->accessDenied();
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param $id
     * @return mixed
     */
    public function edit($id)
    {
        $vehicle = $this->carService->getById($id);

        return $this->permissionService->canEditCar($vehicle->id);
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
        $vehicle = $this->carService->getById($id);

        if ($this->permissionService->canEditCar($vehicle->id)) {
            return $this->carService->update($request, $id);
        } else {
            return $this->accessDenied();
        }
    }

    /**
     ** Remove the specified resource from storage.
     *
     * @param $id
     * @return int
     */
    public function destroy($id)
    {
        $vehicle = $this->carService->getById($id);

        if ($this->permissionService->canDeleteCar($vehicle->id)) {
            return $this->carService->destroy($id);
        } else {
            return $this->accessDenied();
        }
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    private function accessDenied()
    {
        return response()->json('Access denied', 403);
    }
}
