import React, { PropTypes } from 'react';
import { List } from 'immutable';
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
            {selections.forEach(selection => (
                <MenuItem
                    key={selection.get('id')}
                    value={selection.get('value')}
                    primaryText={selection.get('value')}
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
    selections: PropTypes.instanceOf(List).isRequired,
};

DropdownInput.defaultProps = {
    value: '',
};

export default DropdownInput;
