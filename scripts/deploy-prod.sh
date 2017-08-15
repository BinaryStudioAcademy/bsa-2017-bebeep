#!/usr/bin/env bash

echo "deploy on production"
ssh -p $SSH_PASSWORD ssh $SSH_USER@$SSH_HOST <<-EOF
echo $PWD
exit
EOF

