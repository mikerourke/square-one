/**
 * This is a server that mocks the database using json-server.  The records
 *      are stored in the "db.json" file.
 * @module apiServer
 * @link https://github.com/typicode/json-server
 */
import { blue } from 'chalk';
import path from 'path';
import jsonServer from 'json-server';
import routes from './routes.json';

/* eslint-disable */

const port = process.env.API_PORT || 8082;

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
    // TODO: Fix the issue with POST requests not creating a new record.
    if (req.method === 'POST') {
        const randomId = Math.floor(Math.random() * (50000 - 1)) + 1;
        req.body.id = randomId;
    }
    next();
})
server.use(jsonServer.rewriter(routes));

const router = jsonServer.router(path.join(__dirname, 'db.json'));

// This ensures the response body is a single object (not an array of objects)
// if only 1 item is returned:
router.render = (req, res) => {
    const resultData = res.locals.data;
    let responseData;
    // Certain requests don't have a response as an array, this returns a
    // single object if the response data isn't an array:
    if (Array.isArray(resultData)) {
        responseData = resultData.length > 1 ? resultData : resultData[0];
    } else {
        responseData = resultData === 'undefined' ? {} : resultData;
    }
    res.jsonp(responseData);
};
server.use(router);

server.listen(port, () => {
    console.log(blue(`JSON server is running on port ${port}.`));
});
