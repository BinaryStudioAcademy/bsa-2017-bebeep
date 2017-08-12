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
        $this->user = $user;
        return $this;
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