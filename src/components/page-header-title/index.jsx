/* @flow */

/* External dependencies */
import React, { Component } from 'react';
import styled from 'styled-components';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

/* Internal dependencies */
import { alternateTextColor } from 'style/mui/palette';

/* Types */
type DefaultProps = {
    backArrowTooltip: string,
    handleBackArrowTouchTap: (event: Event) => void,
    subheaderText: string
};

type Props = {
    backArrowTooltip?: string,
    handleBackArrowTouchTap?: (event: Event) => void,
    headerText: string,
    subheaderText?: string,
    titleIconName: string,
};

const iconColor: string = alternateTextColor;

/**
 * Styled container for all child elements.
 */
const Container = styled.div`
    display: flex;
`;

/**
 * Styled container for the header and subheader text elements.
 */
const TextRowContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
`;

/**
 * Styled component representing the Header text.
 */
const HeaderTextRow = styled.div`
    align-self: center;
    color: ${iconColor};
    flex: 1 0 100%;
    font-size: 18px;
`;

/**
 * Styled component representing the Subheader text.
 */
const SubheaderTextRow = styled.div`
    align-self: center;
    color: ${iconColor};
    flex: 0 0 100%;
    font-size: 14px;
`;


/**
 * Title component in the page header.
 * @param {string} [backArrowTooltip=""] Tooltip to display when the Back arrow
 *      is hovered.
 * @param {Function} [handleBackArrowTouchTap] Action to perform when the Back
 *      arrow is pressed.
 * @param {string} headerText Text to display in the top row of the text next
 *      to the Title Icon.
 * @param {string} [subheaderText=""] Text to display in the bottom row of the
 *      text next to the Title Icon.
 * @param {string} titleIconName Name of the Material Icon to display in the
 *      title.
 */
class PageHeaderTitle extends Component<DefaultProps, Props, *> {
    props: Props;

    static defaultProps = {
        backArrowTooltip: '',
        handleBackArrowTouchTap: (event: Event) => {},
        subheaderText: '',
    };

    render(): React.Element<*> {
        const {
            backArrowTooltip,
            handleBackArrowTouchTap,
            headerText,
            subheaderText,
            titleIconName,
        } = this.props;

        const backArrowElement: React.Element<*> = (
            <IconButton
                iconClassName="material-icons"
                iconStyle={{ color: iconColor }}
                onTouchTap={handleBackArrowTouchTap}
                tooltip={backArrowTooltip}
                touch={true}
            >
                arrow_back
            </IconButton>
        );

        return (
            <Container>
                {backArrowTooltip && backArrowElement}
                <FontIcon
                    className="material-icons"
                    style={{
                        color: iconColor,
                        fontSize: 56,
                        marginRight: 8,
                    }}
                >
                    {titleIconName}
                </FontIcon>
                <TextRowContainer>
                    <HeaderTextRow>{headerText}</HeaderTextRow>
                    <SubheaderTextRow>{subheaderText}</SubheaderTextRow>
                </TextRowContainer>
            </Container>
        );
    }
}

export default PageHeaderTitle;
