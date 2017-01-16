import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { getLead } from 'data/leads/actions';
import { globalStyles } from 'scenes/styles';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import LocationInput from 'components/LocationInput';
import DropdownInput from 'components/DropdownInput';
import TextInput from 'components/TextInput';

const formStyles = globalStyles.twoColumnForm;

const LeadDetailsForm = (
    {
        handleSubmit,
        load,
        sources,
        handleChange,
        lead,
    }) => (
    <form style={formStyles.wrapper}
          onSubmit={handleSubmit}>
        <div style={formStyles.leftSide}>
            <div>
                <Field name="leadName"
                       component={TextInput}
                       style={globalStyles.input}
                       label="Lead Name"/>
            </div>
            <div>
                <Field name="lastName"
                       component={TextInput}
                       style={globalStyles.input}
                       label="Last Name"/>
            </div>
            <div>
                <Field name="source"
                       component={DropdownInput}
                       style={globalStyles.input}
                       label="Source">
                    {sources.map(source => {
                        return (<MenuItem key={source.id}
                                          value={source.id}
                                          primaryText={source.value}
                        />);
                    })}
                </Field>
            </div>
            <div>
                <Field name="leadFee"
                       component={TextInput}
                       style={globalStyles.input}
                       label="Lead Fee"/>
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
    handleSubmit: PropTypes.func.isRequired,
    load: PropTypes.func,
    sources: PropTypes.array,
    handleChange: PropTypes.func.isRequired,
    lead: PropTypes.object,
};

export default reduxForm({
    form: 'leadDetails'
})(LeadDetailsForm);

