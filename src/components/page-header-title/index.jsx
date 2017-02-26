/* @flow */

/* External dependencies */
import React from 'react';
import styled from 'styled-components';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

/* Internal dependencies */
import { palette } from 'style/mui';

/**
 * Styled container for all child elements.
 */
const Container = styled.div`
    display: flex;
`;

/**
 * Styled row for the page header text element.
 */
const TextRow = styled.div`
    clear: both;
    display: inline-block;
    float: left;
    font-weight: 300;
    padding: 4px 0;
`;

/**
 * Styled container for the page header text elements.
 */
const TextRowContainer = styled.div`
    columns: auto 1;
`;

/**
 * Title component in the page header.
 */
class PageHeaderTitle extends React.Component {
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

    render() {
        const {
            backArrowTooltip,
            handleBackArrowTouchTap,
            headerText,
            subheaderText,
            titleIconName,
        } = this.props;

        const iconColor: string = palette.alternateTextColor;

        const backArrowElement: React.Element<*> = (
            <IconButton
                tooltip={backArrowTooltip}
                tooltipPosition="top-right"
                touch={true}
                iconClassName="material-icons"
                iconStyle={{ color: iconColor }}
                onTouchTap={handleBackArrowTouchTap}
            >
                arrow_back
            </IconButton>
        );

        const subheaderTextRow: React.Element<*> = (
            <TextRow
                style={{
                    color: iconColor,
                    fontSize: 14,
                }}
            >
                {subheaderText}
            </TextRow>
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
                    <TextRow
                        style={{
                            color: iconColor,
                            fontSize: 18,
                        }}
                    >
                        {headerText}
                    </TextRow>
                    {subheaderText && subheaderTextRow}
                </TextRowContainer>
            </Container>
        );
    }
}

export default PageHeaderTitle;
