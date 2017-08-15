#!/usr/bin/env bash

echo "deploy on production"
ssh -t $SSH_USER@$SSH_HOST -o StrictHostKeyChecking=no -i ../.travis/id_rsa <<-EOF
mkdir ~/test
EOF

