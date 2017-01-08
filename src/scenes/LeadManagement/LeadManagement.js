import React, { PropTypes } from 'react';

import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

import LocationSearchBox from './components/LocationSearchBox';
import Dropdown from './components/Dropdown';

import { globalStyles } from '../styles';

const formStyles = globalStyles.twoColumnForm;
const paperStyle = Object.assign({}, globalStyles.paper, {width: '90%'});

const sources = [
    {
        value: '1',
        label: 'Scott'
    },
    {
        value: '2',
        label: 'Mike'
    }
];

class LeadManagement extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isNew: true,
            source: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const firstName = this.refs.firstName.getValue();
        const lastName = this.refs.lastName.getValue();
        this.context.router.push('/leads');
    }

    handleChange(event, index, value) {
        this.setState({source: value});
    }

    render() {
        return (
            <div style={globalStyles.formContainer}>
                <Paper style={paperStyle}>
                    <form style={formStyles.wrapper}
                          onSubmit={this.handleSubmit}>
                        <div style={formStyles.leftSide}>
                        <TextField
                            style={globalStyles.input}
                            ref="firstName"
                            floatingLabelText="First Name"
                        />
                        <br />
                        <TextField
                            style={globalStyles.input}
                            ref="lastName"
                            floatingLabelText="Last Name"
                        />
                        <br />
                        <Dropdown
                            label="Source"
                            handleChange={this.handleChange}
                            options={sources}
                            value={this.state.source}
                        />
                        <br />
                        <TextField
                            style={globalStyles.input}
                            ref="leadFee"
                            floatingLabelText="Lead Fee"
                        />
                        <br />
                        <FlatButton
                            style={globalStyles.flatButton}
                            label="Save"
                            onClick={this.handleSubmit}
                            onTouchTap={this.handleSubmit}
                        />
                        </div>
                        <div style={formStyles.rightSide}>
                            <LocationSearchBox />
                        </div>
                    </form>
                </Paper>
            </div>
        );
    }
}

LeadManagement.propTypes = {
    isNew: PropTypes.bool
};

LeadManagement.contextTypes = {
    router: PropTypes.object
};

export default LeadManagement;