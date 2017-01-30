import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const TextInput = (
    {
        name,
        label,
        value,
        handleChange,
    }) => (
        <TextField
            name={name}
            floatingLabelText={label}
            value={value}
            onChange={handleChange}
        />
);

TextInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
};

TextInput.defaultProps = {
    value: '',
};

export default TextInput;
