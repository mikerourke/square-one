/* @flow */

/* External dependencies */
import React from 'react';
import styled from 'styled-components';
import {
    Toolbar,
    ToolbarGroup,
} from 'material-ui/Toolbar';

/* Internal dependencies */
import { palette } from 'style/mui';

/**
 * Styled wrapper for the action button on the right side of the toolbar.  This
 *      is used to ensure the button is in the same location regardless of
 *      whether or not it is wrapped in "Link" element.
 */
const ActionButtonWrapper = styled.div`
    margin: 6px 24px;
`;

/**
 * Toolbar on the page header.
 */
const PageHeader = ({
    actionButtonRight,
    titleLeft,
    height,
}: {
    actionButtonRight?: React.Element<*>,
    titleLeft: React.Element<*>,
    height?: number,
}): React.Element<*> => (
    <Toolbar
        className="square1-toolbar"
        style={{
            alignItems: 'flex-start',
            backgroundColor: palette.primary1Color,
            height,
            paddingTop: 24,
            top: 64,
            width: '100%',
        }}
    >
        <ToolbarGroup>
            {titleLeft}
        </ToolbarGroup>
        <ToolbarGroup>
            <ActionButtonWrapper>
                {actionButtonRight}
            </ActionButtonWrapper>
        </ToolbarGroup>
    </Toolbar>
);

PageHeader.defaultProps = {
    actionButtonRight: '',
    height: 96,
};

export default PageHeader;
