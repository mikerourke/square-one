/*
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

/*
 * Internal dependencies
 */
import { palette } from 'style/mui';

const Container = styled.div`
    display: flex;
`;

/**
 * Styled row for the page header text element.
 * @type {StyledComponent}
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
 * @type {StyledComponent}
 */
const TextRowContainer = styled.div`
    columns: auto 1;
`;

/**
 * Container for the TextRow elements.
 * @type {StyledComponent}
 */
class PageHeaderTitle extends Component {
    static propTypes = {
        backArrowTooltip: PropTypes.string,
        handleBackArrowTouchTap: PropTypes.func,
        headerText: PropTypes.string.isRequired,
        subheaderText: PropTypes.string,
        titleIconName: PropTypes.string.isRequired,
    };

    static defaultProps = {
        backArrowTooltip: '',
        handleBackArrowTouchTap: () => {},
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

        const iconColor = palette.alternateTextColor;

        const backArrowElement = (
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

        const subheaderTextRow = (
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
