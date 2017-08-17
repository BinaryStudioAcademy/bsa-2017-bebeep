<?php

namespace App\Presenters;

use App\Transformers\UserProfileTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class UserProfilePresenter
 *
 * @package namespace App\Presenters;
 */
class UserProfilePresenter extends FractalPresenter
{
    /**
     * User Profile Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new UserProfileTransformer();
    }
}
