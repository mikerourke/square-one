/**
 * Copies the src/index.html file into build/index.html and performs the
 *      production build action.  Cheerio is used to add the global stylesheet
 *      to the top of the file.  This code was taken from Cory House's
 *      React/Redux Pluralsight course.
 * @module build
 */
import fs from 'fs';
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import colors from 'colors';

/*eslint-disable no-console */

process.env.NODE_ENV = 'production';

console.log('Copying index.html to client directory...'.blue);

fs.createReadStream('../src/index.html')
    .pipe(fs.createWriteStream('../client/index.html'));

console.log('Generating minified bundle for production via Webpack. ' +
            'This will take a moment...'.blue);

webpack(webpackConfig).run((err, stats) => {
    if (err) { // Fatal error occurred. Stop here.
        console.log(err.bold.red);
        return 1;
    }

    const jsonStats = stats.toJson();

    if (jsonStats.hasErrors) {
        return jsonStats.errors.map(error => console.log(error.red));
    }

    if (jsonStats.hasWarnings) {
        console.log('Webpack generated the following warnings: '.bold.yellow);
        jsonStats.warnings.map(warning => console.log(warning.yellow));
    }

    console.log(`Webpack stats: ${stats}`);

    // Build succeeded:
    console.log('Your app has been compiled in production mode and ' +
                'written to /client.'.green);

    return 0;
});
