<?php

namespace App\Http\Requests\DTO;

class FilterDTO
{
    /**
     * FilterDTO constructor.
     * @param string $name
     * @param $params
     */
    public function __construct(string $name, string $params)
    {
        $this->_name = $name;
        $this->_params = $params;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->_name;
    }

    /**
     * @return string
     */
    public function getParam(): string
    {
        return $this->_params;
    }
}