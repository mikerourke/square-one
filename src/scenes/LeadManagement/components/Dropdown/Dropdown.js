import React, { PropTypes } from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { globalStyles } from 'scenes/styles';

const Dropdown = ({label, handleChange, options, value}) => (
    <SelectField
        style={globalStyles.input}
        floatingLabelText={label}
        value={value}
        onChange={handleChange}>
        {options.map(option => {
            return <MenuItem key={option.value} value={option.value} primaryText={option.label} />
        })}
    </SelectField>
);

Dropdown.propTypes = {
    label: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.object),
    value: PropTypes.string
};

export default Dropdown;