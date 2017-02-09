/**
 * Copies the src/index.html file into build/index.html and performs the
 *      production build action.  Cheerio is used to add the global stylesheet
 *      to the top of the file.  This code was taken from Cory House's
 *      React/Redux Pluralsight course.
 */
/* eslint-disable */
const { blue, green, red, yellow } = require('chalk');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('../webpack/webpack.prod.babel');

process.env.NODE_ENV = 'production';
/**
 * Writes the content of the index.html file in "src" directory to the
 *      output folder.  The "vendor.bundle.js" line needs to be added to the
 *      file for the production release.
 */
const createHtmlFile = () => {
    console.log(blue('Creating index.html...'));

    return new Promise((resolve, reject) => {
        const sourcePath = path.resolve(process.cwd(), 'src/www/index.html');
        const targetPath = path.resolve(process.cwd(), 'client/index.html');

        fs.readFile(sourcePath, 'utf8', (error, data) => {
            if (error) {
                reject(`Index file read error: ${error}`);
            }
            const lineToFind = /<script src="\/bundle.js"><\/script>/g;
            const replacementLine =
                '<script src="/bundle.js"></script>\n' +
                '\t\t<script src="/vendor.bundle.js"></script>\n';
            const updatedText = data.replace(lineToFind, replacementLine);

            fs.writeFile(targetPath, updatedText, 'utf8', (error) => {
                if (error) {
                    reject(`Index file write error: ${error}`);
                }
                console.log(green('File write successful for index.html.'));

                resolve();
            });
        });
    });
};

const copyFavicon = () => {
    console.log(blue('Copying favicon.ico to client directory...'));

    return new Promise((resolve) => {
        const sourcePath = path.resolve(process.cwd(), 'src/www/favicon.ico');
        const targetPath = path.resolve(process.cwd(), 'client/favicon.ico');
        fs.createReadStream(sourcePath)
            .pipe(fs.createWriteStream(targetPath));

        console.log(green('File write sucessful for favicon.ico.'));

        resolve();
    });
};

const generateBundles = () => {
    console.log(blue('Generating minified Webpack bundle.  Please wait...'));

    return new Promise((resolve, reject) => {
        webpack(webpackConfig).run((error, stats) => {
            // Fatal error occurred. Stop here:
            if (error) {
                reject(`Webpack error: ${error}`);
            }

            const jsonStats = stats.toJson();

            if (jsonStats.hasErrors) {
                return jsonStats.errors.map(error => console.log(red(error)));
            }

            if (jsonStats.hasWarnings) {
                console.log(yellow('Webpack generated the following warnings: '));
                jsonStats.warnings.map(warning => console.log(yellow(warning)));
            }

            console.log(`Webpack stats: ${stats}`);

            // Build succeeded:
            console.log(green('Compilation complete, output is in /client.'));

            resolve();
        });
    });
};

createHtmlFile()
    .then(copyFavicon)
    .then(generateBundles)
    .catch(error => console.log(red(error)));
