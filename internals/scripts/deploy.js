/**
 * This is used to deploy the bundled front end to the Gandi SFTP site.  The
 *    front end is stored in the same directory as the API files.
 */

/* External dependencies */
const { exec } = require('child_process');
const path = require('path');
const shell = require('shelljs');

// TODO: Fix the path for the SFTP site, I don't think this is structured correctly.
function deployToSftpSite() {
  const gandiUser = process.env.GANDI_USER || '';
  const gandiPass = process.env.GANDI_PASS || '';
  const gandiSftp = process.env.GANDI_SFTP || '';
  const sftpSite = 'sftp://' + gandiUser + '@' + gandiPass;

  const rootPath = path.resolve(process.cwd());
  shell.cd(rootPath);
  exec("sudo lftp -e 'mirror -R client/ vhosts/default/client/'" +
       " -u " + gandiUser + "," + gandiPass + " " + sftpSite);
}

deployToSftpSite();
