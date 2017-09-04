<?php

namespace App\Transformers\Car\Models;

use App\Models\CarModel;
use League\Fractal\TransformerAbstract;

class ModelTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(CarModel $carModel)
    {
        return [
            'id' => $carModel->id_car_model,
            'brand_id' => $carModel->id_car_mark,
            'name' => $carModel->name,
        ];
    }
}
