import React, { PropTypes } from 'react';

import AppBar from 'material-ui/AppBar';
import { ActionAccountCircle } from 'material-ui/svg-icons';

const Header = ({handleToggle, iconStyle}) => {
    return (
        <AppBar
            iconElementRight={<ActionAccountCircle style={iconStyle}/>}
            onLeftIconButtonTouchTap={handleToggle}
        />
    )
};

Header.propTypes = {
    handleToggle: PropTypes.func.isRequired,
    iconStyle: PropTypes.object.isRequired,
};

export default Header;
