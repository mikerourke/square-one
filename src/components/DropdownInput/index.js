import React, { PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { globalStyles } from 'scenes/styles';

const DropdownInput = (
    {
        name,
        label,
        value,
        handleChange,
        children,
    }) => (
    <SelectField
        tabIndex="0"
        style={globalStyles.input}
        name={name}
        floatingLabelText={label}
        onChange={handleChange}
        value={value}>
        {children.map(child => {
            return (
                <MenuItem
                    key={child.id}
                    value={child.value}
                    primaryText={child.value}
                />
            );
        })}
    </SelectField>
);

DropdownInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    handleChange: PropTypes.func,
    children: PropTypes.arrayOf(PropTypes.object),
};

export default DropdownInput;
