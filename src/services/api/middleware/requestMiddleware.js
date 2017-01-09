/**
 * This middleware is used with Redux to return a Promise when performing an
 *      action.  The code was taken from a Stack Overflow article.  I made
 *      some minor modifications to the comments, converted some of the code
 *      to ES2015, and renamed the exported default function
 *      (requestMiddleware was originally apiMiddleware).
 * @link http://stackoverflow.com/questions/34304335/redux-using-async-middlewares-vs-dispatching-actions-on-success-functions
 * @module requestMiddleware
 */
import 'whatwg-fetch';

function isRequest({ promise }) {
    return (promise && typeof promise === 'function');
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const error = new Error(response.statusText || response.status);
        error.response = response.json();
        throw error;
    }
}

function parseJSON(response) {
    return response.json();
}

function makeRequest(urlBase, { promise, types, ...rest }, next) {
    const [REQUEST, SUCCESS, FAILURE] = types;

    // Dispatch your request action so UI can showing loading indicator
    next({ ...rest, type: REQUEST });

    const api = (url, params = {}) => {
        // fetch by default doesn't include the same-origin header.
        // Add this by default.
        params.credentials = 'same-origin';
        params.method = params.method || 'get';
        params.body = params.body || '';
        params.headers = params.headers || {};
        params.headers['Content-Type'] = 'application/json';
        params.headers['Access-Control-Allow-Origin'] = '*';

        return fetch(urlBase + url, params)
            .then(checkStatus)
            .then(parseJSON)
            .then(data => {
                // Dispatch your success action
                next({ ...rest, payload: data, type: SUCCESS });
            })
            .catch(error => {
                // Dispatch your failure action
                next({ ...rest, error, type: FAILURE });
            });
    };

    // Because I'm using promise as a function, I create my own simple wrapper
    // around whatwg-fetch. Note in the action example above, I supply the url
    // and optionally the params and feed them directly into fetch.

    // The other benefit for this approach is that in my action above, I can do
    // var result = action.promise(api => api('foo/bar'))
    // result.then(() => { /* something happened */ })
    // This allows me to be notified in my action when a result comes back.
    return promise(api);
}

/**
 * Middleware function for handling API requests.  When the middleware is setup,
 *      the urlBase is used to specify the root path of API requests, so the
 *      actions only need to pass the route rather than the entire URL.
 * @param {string} urlBase URL to use for the API call.
 * @returns {Function}
 */
export default function requestMiddleware(urlBase) {
    return function () {
        return next => action => isRequest(action) ?
                                 makeRequest(urlBase, action, next) :
                                 next(action);
    };
}
