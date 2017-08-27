[![Build Status](https://travis-ci.org/BinaryStudioAcademy/bsa-2017-bebeep.svg?branch=development)](https://travis-ci.org/BinaryStudioAcademy/bsa-2017-bebeep) [![StyleCI](https://styleci.io/repos/99309628/shield?branch=development)](https://styleci.io/repos/99309628)

## Getting started

Install the following packages prior to standing up your development environment:

- [Git](https://git-scm.com/)
- [docker](https://docs.docker.com/engine/installation/)
- [docker-compose](https://docs.docker.com/compose/install/)

For Windows OS:  

- You need to set the password for your user account, if you do not have one. During installation, Docker requests Sharing folders with the project, and for this you need to enter a password.  
- Also possible problems with the firewall. Temporarily disable or add the Docker to the exceptions.  

Clone this repository to your favorite repository source directory and cd inside.  

Then type:

``` bash
cp .env.example .env
docker-compose up -d
docker-compose run --rm composer install
docker-compose exec web php artisan key:generate
docker-compose exec web php artisan migrate:install
```

For Windows OS - `winpty docker-compose exec web php artisan <your command>`  

### Frontend part (SPA)

Install all javascript packages:  

``` bash
npm install
```

Compile all resources:  

_Development_  
``` bash
npm run dev
```

_... with the automatically recompile_  
``` bash
npm run watch
```

_Production_  
``` bash
npm run prod
```

Done. Go to:

```bash
http://localhost
```

## Usage

After installation to start your containers you have only type next command:
``` bash
docker-compose up -d web
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
