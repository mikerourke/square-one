// @flow
/*
 * External dependencies
 */
import React from 'react';
import styled from 'styled-components';
import Paper from 'material-ui/Paper';
import {
    Tabs,
    Tab,
} from 'material-ui/Tabs';

/**
 * Styled container for the Tabs elements.
 */
const Container = styled.div`
    background: white;
    height: 48px;
    width: 100%;
`;

/**
 * Returns a number that represents the total width of the Tab item container
 *      based on the quantity of pages passed to the component.
 */
const getTabItemContainerStyle: Function = (tabCount: number) => ({
    width: tabCount * 128,
});

type TabPage = {
    content: Node,
    label: string,
    map: () => {},
}

/**
 * Toolbar containing tabs for navigating a detail form.
 * @constructor
 */
const TabsToolbar = ({
    tabPages,
}: {
    tabPages: Array<TabPage>,
}) => (
    <Container className="square1-toolbar">
        <Tabs
            style={{
                margin: '0 auto',
                maxWidth: 1200,
            }}
            tabItemContainerStyle={getTabItemContainerStyle(tabPages.length)}
        >
            {tabPages.map(tabPage => (
                <Tab
                    key={tabPage.label}
                    label={tabPage.label}
                    style={{ textTransform: 'none' }}
                >
                    <Paper
                        style={{
                            margin: '24px 0',
                            padding: 24,
                        }}
                    >
                        {tabPage.content}
                    </Paper>
                </Tab>
            ))}
        </Tabs>
    </Container>
);

export default TabsToolbar;
