<?php

namespace App\Http\Requests\DTO;

class FilterDTO
{
    /**
     * FilterDTO constructor.
     * @param string $name
     * @param $params
     */
    public function __construct(string $name, array $params)
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
     * @return array
     */
    public function getParams(): array
    {
        return $this->_params;
    }

    /**
     * @param string $paramName
     *
     * @return mixed
     */
    public function getParam(string $paramName)
    {
        return $this->_params[$paramName];
    }
}
