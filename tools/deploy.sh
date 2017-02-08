#!/usr/bin/env bash
cd ~/workspace/square1-web
SFTP_SITE="sftp://${GANDI_USER}@${GANDI_SFTP}"
sudo lftp -e 'mirror -R client/ vhosts/default/client/' -u $GANDI_USER,$GANDI_PASS $SFTP_SITE
