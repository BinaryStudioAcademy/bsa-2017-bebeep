#!/usr/bin/env bash

echo "deploy on stage"

ssh -t $SSH_USER@$SSH_HOST -o StrictHostKeyChecking=no -i .travis/id_rsa -tt <<-EOF
cd /srv/stage &&
git checkout ./ &&
git pull &&
docker-compose pull &&
docker-compose run --rm composer install &&
docker-compose exec -T web php artisan migrate &&
docker-compose exec -T web php artisan migrate:refresh --seed &&
docker-compose down &&
docker-compose run --rm node npm install -q &&
docker-compose run --rm node npm run prod &&
docker-compose -f docker-compose.yml -f docker-compose.stage.yml up -d web

EOF
