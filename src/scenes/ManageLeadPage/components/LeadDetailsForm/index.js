import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { globalStyles } from 'scenes/styles';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import LocationInput from 'components/LocationInput';
import DropdownInput from 'components/DropdownInput';
import TextInput from 'components/TextInput';

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

const LeadDetailsForm = ({handleSubmit}) => (
    <form style={formStyles.wrapper}
          onSubmit={handleSubmit}>
        <div style={formStyles.leftSide}>
            <div>
                <Field name="firstName" 
                       component={TextInput}
                       style={globalStyles.input}
                       label="First Name" />
            </div>
            <div>
                <Field name="lastName" 
                       component={TextInput}
                       style={globalStyles.input}
                       label="Last Name" />
            </div>
            <div>
                <Field name="source" 
                       component={DropdownInput}
                       label="Source">
                    {sources.map(source => {
                        return (<MenuItem key={source.value} 
                                          value={source.value}
                                          primaryText={source.label}
                                />);
                    })}
                </Field>
            </div>
            <div>
                <Field name="leadFee" 
                       component={TextInput}
                       style={globalStyles.input}
                       label="Lead Fee" />
            </div>
            <div>
                <FlatButton
                    style={globalStyles.flatButton}
                    label="Save"
                    onClick={handleSubmit}
                    onTouchTap={handleSubmit}
                />
            </div>
        </div>
    </form>
);

LeadDetailsForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired    
};

export default reduxForm({
    form: 'leadDetails'
})(LeadDetailsForm);
