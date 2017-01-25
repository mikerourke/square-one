import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';

const getStyle = color => ({
    cursor: 'pointer',
    padding: 0,
    color,
});

const MaterialButton = (
    {
        iconName,
        color,
    }) => (
        <IconButton
            iconStyle={getStyle(color)}
            iconClassName="material-icons"
        >
            {iconName}
        </IconButton>
);

MaterialButton.propTypes = {
    iconName: PropTypes.string.isRequired,
    color: PropTypes.string,
};

MaterialButton.defaultProps = {
    color: 'rgba(0, 0, 0, 0.870588)',
};

export default MaterialButton;
