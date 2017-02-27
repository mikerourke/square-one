/* @flow */

/* External dependencies */
import React from 'react';
import styled from 'styled-components';
import Paper from 'material-ui/Paper';
import { Tab, Tabs } from 'material-ui/Tabs';

/**
 * Styled container for the Tabs elements.
 */
const Container = styled.div`
    background: white;
    height: 48px;
    width: 100%;
`;

/**
 * Page in the Tabs toolbar.
 * @typedef TabPage
 */
type TabPage = {
    content: React.Element<*> | string,
    label: string,
    map?: () => void,
};

/**
 * Toolbar containing tabs for navigating a detail form.
 * @param {Array} tabPages Array of TabPage components.
 */
const TabsToolbar = ({
    tabPages,
}: {
    tabPages: Array<TabPage>,
}): React.Element<*> => (
    <Container className="square1-toolbar">
        <Tabs
            style={{
                margin: '0 auto',
                maxWidth: 1200,
                padding: '0 16px',
            }}
            tabItemContainerStyle={{ width: tabPages.length * 112 }}
        >
            {tabPages.map(tabPage => (
                <Tab
                    key={tabPage.label}
                    label={tabPage.label}
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
