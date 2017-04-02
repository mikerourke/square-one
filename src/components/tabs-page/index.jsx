/* @flow */

/* External dependencies */
import React from 'react';
import styled from 'styled-components';
import Paper from 'material-ui/Paper';
import { Tab, Tabs } from 'material-ui/Tabs';

/* Types */
type TabPage = {
    content: React.Element<*> | string,
    label: string,
    map?: () => void,
    onActive?: () => void,
    paperStyle?: ?Object,
    value: string,
};

/**
 * Styled container for the Tabs elements.
 */
const Container = styled.div`
    background: white;
    height: 48px;
    width: 100%;
`;

/**
 * Applies any custom styles specified in the props passed to the component
 *      which applies to all the pages, or the props for each individual tab.
 *      Applies a default style that can be overridden by either parameter.
 * @param {Object} [styleFromProps={}] Style object passed to the TabsPage
 *      component.
 * @param {Object} [styleFromTabPage={}] Style object passed to each individual
 *      TabPage component.
 */
const getPaperStyle = (styleFromProps = {}, styleFromTabPage = {}): Object =>
    Object.assign({}, {
        margin: '24px 0',
        padding: 24,
    }, styleFromProps, styleFromTabPage);

/**
 * Page containing a tab control and corresponding pages.
 * @param {Function} [handleTabPageChange] Action to perform when the tab page
 *      is changed.
 * @param {Object} [paperStyle] Style to assign to the paper of the tab page.
 *      This is overridden by the setting for each TabPage element.
 * @param {Array} tabPages Array of TabPage components.
 */
const TabsPage = ({
    handleTabPageChange,
    paperStyle,
    tabPages,
}: {
    handleTabPageChange?: (value: string) => void,
    paperStyle?: ?Object,
    tabPages: Array<TabPage>,
}): React.Element<*> => (
    <Container className="square1-toolbar">
        <Tabs
            onChange={handleTabPageChange}
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
                    onActive={tabPage.onActive}
                    value={tabPage.value}
                >
                    <Paper
                        style={getPaperStyle(paperStyle, tabPage.paperStyle)}
                    >
                        {tabPage.content}
                    </Paper>
                </Tab>
            ))}
        </Tabs>
    </Container>
);

export default TabsPage;
