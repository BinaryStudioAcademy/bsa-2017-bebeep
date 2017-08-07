## Getting started

Install the following packages prior to standing up your development environment:

- [Git](https://git-scm.com/)
- [docker](https://docs.docker.com/engine/installation/)
- [docker-compose](https://docs.docker.com/compose/install/)

Clone this repository to your favorite repository source directory and cd inside.

Then type:

``` bash
cp .env.example .env
docker-compose up -d
docker-compose run --rm composer install
docker-compose exec web php artisan key:generate
docker-compose exec web php artisan migrate:install
```
Done. Go to:

```bash
http://localhost
```

## Usage

After installation to start your containers you have only type next command:
``` bash
docker-compose up -d
```

If you want to run composer command you should use it within docker:
``` bash
docker-compose run --rm composer <your command>
```

In order to execute artisan command use next syntax:
``` bash
docker-compose exec web php artisan <your command>
```

Running tests:

```bash
docker-compose run --rm tests
```
