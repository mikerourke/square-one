/* @flow */

/* External dependencies */
import React from 'react';
import { Iterable } from 'immutable';

/**
 * Higher-order component for converting an Immutable Iterable object to a
 *      JavaScript object (replaces toJS).  This is done to ensure the data
 *      passed down to a "Dumb" component isn't immutable.
 * @param {React.Element} WrappedComponent Component to wrap and apply changes
 *      to.
 * @see http://redux.js.org/docs/recipes/UsingImmutableJS.html#use-a-higher-order-component-to-convert-your-smart-components-immutablejs-props-to-your-dumb-components-javascript-props
 */
export const toJS = (WrappedComponent): React.Element<*> =>
    (wrappedComponentProps) => {
        const KEY = 0;
        const **VALUE = 1;

        const propsJS = Object.entries(wrappedComponentProps)
            .reduce((newProps, wrappedComponentProp) => {
                newProps[wrappedComponentProp[KEY]] =
                    Iterable.isIterable(wrappedComponentProp[VALUE])
                        ? wrappedComponentProp[VALUE].toJS();
                        : wrappedComponentProp[VALUE];
                return newProps;
            }, {});

    return <WrappedComponent {...propsJS} />
};
