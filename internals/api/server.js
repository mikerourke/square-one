/**
 * This is a server that mocks the database using json-server.  The records
 *      are stored in the "db.json" file.
 * @link https://github.com/typicode/json-server
 */

/* External dependencies */
const { blue } = require('chalk');
const path = require('path');
const jsonServer = require('json-server');

/* Internal dependencies */
const assignCustomRoutes = require('./routes');

const port = process.env.API_PORT || 8082;

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Use custom routes:
const rewrittenRoutes = {
    '/api/': '/',
    '/users/:username': '/users?username=:username',
    '/settings/:settingName': '/settings?settingName=:settingName',
    '/settings/:category/:settingName': '/settings?category=:category&settingName=:settingName'
};
server.use(jsonServer.rewriter(rewrittenRoutes));

const router = jsonServer.router(path.join(__dirname, 'db.json'));

// This ensures the response body is a single object (not an array of objects)
// if only 1 item is returned.
router.render = (req, res) => {
    const resultData = res.locals.data;
    let responseData;

    // Certain requests don't have a response as an array, this returns a
    // single object if the response data isn't an array.
    if (Array.isArray(resultData)) {
        responseData = resultData.length > 1 ? resultData : resultData[0];
    } else {
        responseData = resultData === 'undefined' ? {} : resultData;
    }
    res.jsonp(responseData);
};

assignCustomRoutes(router, server);
server.use(router);

server.listen(port, () => {
    console.log(blue(`JSON server is running on port ${port}.`));
});
