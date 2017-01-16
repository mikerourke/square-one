import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const TextInput = (
    {
        input,
        label,
        meta: { touched, error },
        ...custom
    }) => (
    <TextField
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
    />
);

TextInput.propTypes = {
    input: PropTypes.object,
    label: PropTypes.string.isRequired,
    touched: PropTypes.string,
    error: PropTypes.string,
};

export default TextInput;
