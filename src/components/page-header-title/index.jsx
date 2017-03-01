/* @flow */

/* External dependencies */
import React from 'react';
import styled from 'styled-components';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

/* Internal dependencies */
import { alternateTextColor } from 'style/mui/palette';

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
 */
export default class PageHeaderTitle extends React.Component {
    props: {
        backArrowTooltip?: string,
        handleBackArrowTouchTap?: (event: Event) => void,
        headerText: string,
        subheaderText?: string,
        titleIconName: string,
    };

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
