/**
 * Copies the src/index.html file into build/index.html and performs the
 *      production build action.  Cheerio is used to add the global stylesheet
 *      to the top of the file.  This code was taken from Cory House's
 *      React/Redux Pluralsight course.
 */
import { blue, green, red, yellow } from 'chalk';
import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import webpackConfig from '../webpack.config';

/* eslint-disable no-console */

process.env.NODE_ENV = 'production';

console.log(blue('Copying index.html to client directory...'));

const sourceHtmlPath = path.join(__dirname, '..', 'src/index.html');
const targetHtmlPath = path.join(__dirname, '..', 'client/index.html');
fs.createReadStream(sourceHtmlPath)
    .pipe(fs.createWriteStream(targetHtmlPath));

console.log(blue('Copying favicon.ico to client directory...'));

const sourceFaviconPath = path.join(__dirname, '..', 'src/favicon.ico');
const targetFaviconPath = path.join(__dirname, '..', 'client/favicon.ico');
fs.createReadStream(sourceFaviconPath)
    .pipe(fs.createWriteStream(targetFaviconPath));

console.log(blue('Generating minified Webpack bundle.  Please wait...'));

webpack(webpackConfig).run((err, stats) => {
    // Fatal error occurred. Stop here:
    if (err) {
        console.log(red(err));
        return 1;
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

    return 0;
});
