/**
 * This is a server that mocks the database using json-server.  The records
 *      are stored in the "db.json" file.
 * @module apiServer
 * @link https://github.com/typicode/json-server
 */
import { blue } from 'chalk';
import path from 'path';
import jsonServer from 'json-server';

/* eslint-disable no-console */
const port = process.env.API_PORT || 8082;

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(jsonServer.rewriter({
    '/api/': '/',
    '/users/:username': '/users?username=:username',
}));

const router = jsonServer.router(path.join(__dirname, 'db.json'));
server.use(router);

server.listen(port, () => {
    console.log(blue(`JSON server is running on port ${port}.`));
});
