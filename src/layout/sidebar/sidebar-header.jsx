/* @flow */

/* External dependencies */
import React from 'react';
import glamorous from 'glamorous';
import FontIcon from 'material-ui/FontIcon';

/* Internal dependencies */
import { alternateTextColor, primary1Color } from 'style/mui/palette';

/**
 * Header used by the Sidebar in the application layout.
 * @param {string} fullNameOfUser Name to display in the header.
 */
const SidebarHeader = ({
  fullNameOfUser,
}: {
  fullNameOfUser: string,
}): React.Element<*> => (
  <glamorous.Div
    backgroundColor={primary1Color}
    color={alternateTextColor}
    height={144}
    paddingLeft={24}
  >
    <FontIcon
      className="material-icons"
      style={{
        color: alternateTextColor,
        fontSize: 56,
        marginTop: 24,
      }}
    >
      face
    </FontIcon>
    <glamorous.Div
      fontSize={14}
      marginTop={12}
    >
      {fullNameOfUser}
    </glamorous.Div>
  </glamorous.Div>
);

export default SidebarHeader;
