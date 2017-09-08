<?php

namespace App\Transformers\Car\Brands;

use App\Models\CarBrand;
use League\Fractal\TransformerAbstract;

class BrandTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(CarBrand $carBrand)
    {
        return [
            'id' => $carBrand->id_car_mark,
            'name' => $carBrand->name,
        ];
    }
}
