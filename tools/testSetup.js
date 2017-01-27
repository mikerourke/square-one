/**
 * This code was taken from Cory House's Pluralsight course on Building
 *      Applications with React and Redux in ES6.
 *      Tests are placed alongside files under test. This file does the
 *      following:
 *      1. Disables Webpack-specific features that Mocha doesn't understand.
 *      2. Requires jsdom so we can test via an in-memory DOM in Node.
 *      3. Sets up global vars that mimic a browser.
 * @link https://app.pluralsight.com/library/courses/react-redux-react-router-es6
 */

/* eslint-disable */

import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import jsdom from 'jsdom';

// Ensure Chai is accommodating for immutable data structures:
chai.use(chaiImmutable);

// This assures the Babel configuration (which includes hot module reloading
// code) doesn't apply for tests.
process.env.NODE_ENV = 'test';

// Disable webpack-specific features for tests since Mocha doesn't know what
// to do with them.
require.extensions['.css'] = function () { return null; };
require.extensions['.png'] = function () { return null; };
require.extensions['.jpg'] = function () { return null; };

// Setup the simplest document possible:
let doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
let win = doc.defaultView;

// Set globals for mocha that make access to document and window feel
// natural in the test environment:
global.document = doc;
global.window = win;
global.self = global;

/**
 * Take all the properties of the window object and attach them to the mocha
 *      global object. This is to prevent 'undefined' errors which sometime
 *      occur.
 * @see http://jaketrent.com/post/testing-react-with-jsdom/
 * @param  {object} window: The fake window, build by jsdom
 */
((window) => {
    for (let key in window) {
        if (!window.hasOwnProperty(key)) {
            continue;
        }
        if (key in global) {
            continue;
        }
        global[key] = window[key];
    }
})(win);
