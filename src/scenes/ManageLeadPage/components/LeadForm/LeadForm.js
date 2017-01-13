import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import FlatButton from 'material-ui/FlatButton';
import LocationSearchBox from '../LocationSearchBox';
import Dropdown from '../Dropdown';
import { globalStyles } from 'scenes/styles';

const formStyles = globalStyles.twoColumnForm;

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

class LeadForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isNew: true,
            source: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, index, value) {
        this.setState({source: value});
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form style={formStyles.wrapper}
                onSubmit={handleSubmit}>
                <div style={formStyles.leftSide}>
                <Field
                    name="firstName"
                    component={TextField}
                    style={globalStyles.input}
                    floatingLabelText="First Name"
                    ref="firstName" withRef
                />
                <br />
                <Field
                    name="lastName"
                    component={TextField}
                    style={globalStyles.input}
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
                <Field
                    name="leadFee"
                    component={TextField}
                    style={globalStyles.input}
                    floatingLabelText="Lead Fee"
                />
                <br />
                <FlatButton
                    style={globalStyles.flatButton}
                    label="Save"
                    onClick={handleSubmit}
                    onTouchTap={handleSubmit}
                />
                </div>
                <div style={formStyles.rightSide}>
                    <LocationSearchBox />
                </div>
            </form>
        )
    }
}

LeadForm = reduxForm({
    form: 'manageLead',
    initialValues: {
        firstName: 'Mike',
    }
})(LeadForm);

export default LeadForm;
