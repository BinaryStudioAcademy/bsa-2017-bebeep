#!/usr/bin/env bash

echo "deploy on production"
ssh -t $SSH_USER@$SSH_HOST <<-EOF
mkdir ~/test
EOF

