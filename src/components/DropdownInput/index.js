import React, { PropTypes } from 'react';
import { globalStyles } from 'scenes/styles';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

const DropdownInput = (
    {
        name,
        label,
        value,
        handleChange,
        selections,
    }) => (
        <SelectField
            tabIndex="0"
            style={globalStyles.input}
            name={name}
            floatingLabelText={label}
            onChange={handleChange}
            value={value}
        >
            {selections.map(selection => (
                <MenuItem
                    key={selection.id}
                    value={selection.value}
                    primaryText={selection.value}
                />
            ))}
        </SelectField>
);

DropdownInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    handleChange: PropTypes.func.isRequired,
    selections: PropTypes.array.isRequired,
};

DropdownInput.defaultProps = {
    value: '',
    selections: [],
};

export default DropdownInput;
