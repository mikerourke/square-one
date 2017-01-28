import React, { PropTypes } from 'react';
import MuiGeoSuggest from 'material-ui-geosuggest';

const LocationInput = (
    {
        name,
        label,
        style,
        value,
        handleChange,
    }) => (
        <MuiGeoSuggest
            name={name}
            floatingLabelText={label}
            style={style}
            value={value}
            onChange={handleChange}
        />
);

LocationInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    style: PropTypes.object.isRequired,
    value: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
}

LocationInput.defaultProps = {
    value: '',
}

export default LocationInput;
