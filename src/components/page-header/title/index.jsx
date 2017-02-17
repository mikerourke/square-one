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
import HeaderRow from './header-row';

const Container = styled.div`
    display: flex;
`;

const HeaderWrapper = styled.div`
    columns: auto 1;
`;

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
                <HeaderWrapper>
                    <HeaderRow style={{ fontSize: 18 }}>
                        {headerText}
                    </HeaderRow>
                    <HeaderRow style={{ fontSize: 14 }}>
                        {subheaderText}
                    </HeaderRow>
                </HeaderWrapper>
            </Container>
        )
    }
}

export default PageHeaderTitle;
