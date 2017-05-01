/* @flow */

/* External dependencies */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';

/* Internal dependencies */
import { getAllSettings } from 'state/settings/actions';
import { getAllUsers } from 'state/entities/users/actions';
import Session from 'state/session/model';

/* Types */
type DefaultProps = {
    getAllSettings: () => Promise<*>,
    getAllUsers: () => Promise<*>,
};

type Props = {
    getAllSettings: () => Promise<*>,
    getAllUsers: () => Promise<*>,
    session: Session,
};

type State = {
    entitiesLoaded: boolean,
};

const mapStateToProps = state => ({
    session: state.get('session'),
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    getAllSettings: () => dispatch(getAllSettings()),
    getAllUsers: () => dispatch(getAllUsers()),
});

export class Dashboard extends Component<DefaultProps, Props, State> {
    props: Props;
    state: State;

    static defaultProps = {
        getAllSettings: () => Promise.resolve(),
        getAllUsers: () => Promise.resolve(),
    };

    constructor() {
        super();
        this.state = {
            entitiesLoaded: false,
        };
    }

    componentDidMount(): void {
        this.hydrateState();
    }

    /**
     * Populates state with Settings and User entities.
     */
    hydrateState = (): void => {
        const getAllSettingsFn = this.props.getAllSettings;
        const getAllUsersFn = this.props.getAllUsers;
        getAllSettingsFn()
            .then(getAllUsersFn)
            .then(() => {
                this.setState({ entitiesLoaded: true });
            });
    };

    render() {
        return (
            <Paper>
                <div>Dashboard</div>
            </Paper>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
