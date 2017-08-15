#!/usr/bin/env bash

echo "deploy on production"

ssh -t $SSH_USER@$SSH_HOST -o StrictHostKeyChecking=no -i .travis/id_rsa -tt <<-EOF
cd /srv/production
git pull
docker-compose pull
docker-compose run --rm composer install
docker-compose run --rm node npm install -q
docker-compose run --rm node npm run prod
docker-compose up web -d
EOF

