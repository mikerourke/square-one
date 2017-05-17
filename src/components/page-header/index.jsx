/* @flow */

/* External dependencies */
import React from 'react';
import glamorous from 'glamorous';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

/* Internal dependencies */
import { primary1Color } from 'style/mui/palette';

/**
 * Header toolbar for performing page-level actions.
 * @param {Node} titleLeft React title component to display on the left side of
 *    the header.
 * @param {Node} [actionButtonRight] React button component to display on the
 *    right side of the header.
 * @param {number} [height=96] Height of the header in pixels.
 */
const PageHeader = ({
  titleLeft,
  actionButtonRight,
  height = 96,
}: {
  titleLeft: React.Element<*>,
  actionButtonRight?: ?React.Element<*>,
  height?: number,
}): React.Element<*> => (
  <Toolbar
    className="square-one-toolbar"
    style={{
      height,
      alignItems: 'flex-start',
      backgroundColor: primary1Color,
      paddingTop: 24,
      top: 64,
      width: '100%',
    }}
  >
    <ToolbarGroup>
      {titleLeft}
    </ToolbarGroup>
    <ToolbarGroup>
      {/*
       * Ensure the button is in the same location regardless of
       * whether or not it is wrapped in a "Link" element.
       */}
      <glamorous.Div margin="6px 24px">
        {actionButtonRight}
      </glamorous.Div>
    </ToolbarGroup>
  </Toolbar>
);

export default PageHeader;
