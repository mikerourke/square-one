import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const TextInput = props => (
    <TextField
        hintText={props.hint && props.label}
        floatingLabelText={props.label}
        errorText={props.touched && props.error}
        {...props}
    />
);

TextInput.propTypes = {
    hint: PropTypes.string.isRequired,
    label: PropTypes.string,
    touched: PropTypes.string,
    error: PropTypes.string,
};

export default TextInput;