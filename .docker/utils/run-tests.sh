#!/bin/bash

php artisan key:generate
php artisan migrate:install
php artisan migrate
php vendor/bin/phpunit tests