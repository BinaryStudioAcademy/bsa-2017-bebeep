<?php

namespace App\Http\Requests\DTO;

class FilterDTO
{
    /**
     * FilterDTO constructor.
     *
     * @param string $name
     * @param array $params
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
     * @param string $paramName
     *
     * @return mixed
     */
    public function getParam(string $paramName)
    {
        return $this->_params[$paramName];
    }

    /**
     * @return array
     */
    public function getParams(): array
    {
        return $this->_params;
    }
}