/* @flow */

/* External dependencies */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

/* Types */
type Props = {
    isAuthenticated: boolean,
}

export default function (ComposedComponent: Object) {
    class Authentication extends Component<*, Props, *> {
        props: Props;

        componentWillMount(): void {
            if (!this.props.isAuthenticated) {
                browserHistory.push('/login');
            }
        }

        componentWillUpdate(nextProps: Props): void {
            if (!nextProps.authenticated) {
                browserHistory.push('/login');
            }
        }

        render(): React.Element<*> {
            return <ComposedComponent {...this.props} />;
        }
    }

    const mapStateToProps = state => ({
        isAuthenticated: state.getIn(['session', 'isAuthenticated']),
    });

    return connect(mapStateToProps)(Authentication);
}
