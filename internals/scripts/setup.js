/* eslint-disable */

const { exec } = require('child_process');
const path = require('path');

const runCommand = (commandToRun) => {
    return new Promise((resolve, reject) => {
        exec(commandToRun, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            }
            resolve();
        });
    })
};

function rebuildPackages() {
    const clearModules = runCommand('rm -rf node_modules');
    const cleanYarnCache = runCommand('yarn cache clean');
    const reinstallModules = runCommand('yarn install');
    
    clearModules
        .then(cleanYarnCache)
        .then(reinstallModules)
        .then(() => {
            console.log('Completed')
        })
        .catch(error => console.log(error));
    
}