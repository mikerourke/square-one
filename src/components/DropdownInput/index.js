import React, { PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import { globalStyles } from 'scenes/styles';

const DropdownInput = props => (
    <SelectField
        style={globalStyles.input}
        floatingLabelText={props.label}
        errorText={props.touched && props.error}
        {...props}
        onChange={(event, index, value) => props.handleChange(value)} 
    />
);

DropdownInput.propTypes = {
    label: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.object),
    value: PropTypes.string,
    touched: PropTypes.string,
    error: PropTypes.string,
};

export default DropdownInput;