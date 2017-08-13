<?php

namespace Tests;

use Illuminate\Contracts\Auth\Authenticatable;

class JwtTestCase extends TestCase
{

    protected $user;

    /**
     * @param Authenticatable $user
     * @param null $driver
     * @return $this
     */
    public function actingAs(Authenticatable $user, $driver = null)
    {
        if ($this->user && $this->user->id == $user->getAuthIdentifier()) {
            return $this;
        }

        $this->user = $user;

        return $this;
    }

    /**
     * @param $user
     * @param $method
     * @param $url
     * @param $data
     * @return \Illuminate\Foundation\Testing\TestResponse
     */
    public function jsonRequestAsUser($user, $method, $url, $data)
    {
        return $this->actingAs($user)->json($method, $url, $data);
    }

    /**
     * Call the given URI and return the Response.
     *
     * @param  string $method
     * @param  string $uri
     * @param  array $parameters
     * @param  array $cookies
     * @param  array $files
     * @param  array $server
     * @param  string $content
     * @return \Illuminate\Http\Response
     */
    public function call($method, $uri, $parameters = [], $cookies = [], $files = [], $server = [], $content = null)
    {
        if ($this->user) {
            $server['HTTP_AUTHORIZATION'] = 'Bearer '.\JWTAuth::fromUser($this->user);
        }

        $server['HTTP_ACCEPT'] = 'application/json';

        return parent::call($method, $uri, $parameters, $cookies, $files, $server, $content);
    }
}
