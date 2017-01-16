import React, { PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import { globalStyles } from 'scenes/styles';

const DropdownInput = (
    {
        input,
        label,
        meta: { touched, error },
        children,
        ...custom
    }) => (
    <SelectField
        tabIndex="0"
        style={globalStyles.input}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        onChange={(event, index, value) => input.onChange(value)}
        children={children}
        {...custom}
    />
);

DropdownInput.propTypes = {
    input: PropTypes.object,
    label: PropTypes.string.isRequired,
    touched: PropTypes.string,
    error: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.object),
};

export default DropdownInput;
