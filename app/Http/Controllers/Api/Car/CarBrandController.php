<?php

namespace App\Http\Controllers\Api\Car;

use Illuminate\Http\Request;
use App\Services\CarBrandService;
use App\Services\CarModelService;
use App\Http\Controllers\Controller;

class CarBrandController extends Controller
{

    private $carBrandService;
    private $carModelService;

    /**
     * CarBrandController constructor.
     *
     * @param CarBrandService $carBrandService
     * @param CarModelService $carModelService
     */
    public function __construct(CarBrandService $carBrandService,
                                CarModelService $carModelService)
    {
        $this->carBrandService = $carBrandService;
        $this->carModelService = $carModelService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->carBrandService->getAll();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    /**
     * @param $id
     * @return mixed
     */
    public function getCarModel($id){
        if ($this->carModelService->getModelByIdMark($id)->count() !== 0){
            return $this->carModelService->getModelByIdMark($id);
        } else {
            return response()->json('Not found', 404);
        }
    }
}
