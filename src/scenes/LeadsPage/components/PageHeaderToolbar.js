import React from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import HeaderToolbar from 'components/HeaderToolbar';
import ToolbarTitle from './ToolbarTitle';

const PageHeaderToolbar = () => (
    <div>
        <HeaderToolbar
            hasSearch={true}
            title={<ToolbarTitle />}
        >
            <Link to="/leads/new">
                <RaisedButton label="Add New Lead" />
            </Link>
        </HeaderToolbar>
    </div>
);

export default PageHeaderToolbar;
