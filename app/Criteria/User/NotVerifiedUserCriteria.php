<?php

namespace App\Criteria\User;

use Prettus\Repository\Contracts\{
    CriteriaInterface,
    RepositoryInterface
};

/**
 * Class NotVerifiedUserCriteriaCriteria
 *
 * @package namespace App\Criteria;
 */
class NotVerifiedUserCriteria implements CriteriaInterface
{
    private $email;
    private $token;

    public function __construct($email, $token)
    {
        $this->email = $email;
        $this->token = $token;
    }

    /**
     * Apply criteria in query repository
     *
     * @param                     $model
     * @param RepositoryInterface $repository
     *
     * @return mixed
     */
    public function apply($model, RepositoryInterface $repository)
    {
        return $model->where([
            'email' => $this->email,
            'verification_token' => $this->token,
            'is_verified' => false,
        ]);
    }
}
