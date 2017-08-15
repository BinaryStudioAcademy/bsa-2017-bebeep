#!/usr/bin/env bash

echo "deploy on production"
sshpass -p $SSH_PASSWORD ssh -tt $SSH_USER@$SSH_HOST <<-EOF
echo $PWD
exit
EOF

