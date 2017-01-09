/**
 * Represents an entity performing HTTP requests on the server.  This is
 *      instantiated when the store is created.  The code was taken from the
 *      react-redux-universal-hot-example boilerplate on GitHub.
 * @link https://github.com/erikras/react-redux-universal-hot-example
 */
import superagent from 'superagent';

const methods = ['get', 'post', 'put', 'patch', 'del'];

/**
 * Cleans up the path passed to the HTTP request and changes it based on the
 *      current environment.  Prepends a URL if necessary.
 * @param {string} path API path to format.
 * @returns {string} Formatted URL for the HTTP request.
 */
function formatUrl(path) {
    // TODO: Fix this to accommodate for "api" in the path.
    const adjustedPath = path[0] !== '/' ? '/' + path : path;
    if (process.env.NODE_ENV === 'production') {
        // Prepend host and port of the API server to the path.
    }
    return 'http://localhost:8082' + adjustedPath;
}

export default class ApiClient {
    constructor() {
        methods.forEach((method) =>
            this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
                const request = superagent[method](formatUrl(path));

                if (params) {
                    request.query(params);
                }

                if (data) {
                    request.send(data);
                }

                request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));
            }));
    }

    /*
     * There's a V8 bug where, when using Babel, exporting classes with only
     * constructors sometimes fails. Until it's patched, this is a solution to
     * "ApiClient is not defined" from issue #14.
     * https://github.com/erikras/react-redux-universal-hot-example/issues/14
     *
     * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
     *
     * Remove it at your own risk.
     */
    empty() {}
}
