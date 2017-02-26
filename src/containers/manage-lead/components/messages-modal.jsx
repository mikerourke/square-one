/* @flow */

/* External dependencies */
import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

const MessageBlock = styled.div`
    margin: 24px 0;
`;

class MessagesModal extends React.Component {
    props: {
        handleModalTouchTap: (event: Event) => void,
        isOpen: boolean,
    };

    state: {
        leadMessage: string,
        representativeMessage: string,
        sendLeadMessage: boolean,
        sendRepresentativeMessage: boolean,
    };

    constructor(props: any) {
        super(props);

        this.state = {
            leadMessage: '',
            representativeMessage: '',
            sendLeadMessage: false,
            sendRepresentativeMessage: false,
        };

        (this: any).handleInputChange =
            this.handleInputChange.bind(this);
        (this: any).handleSelectionChange =
            this.handleSelectionChange.bind(this);
    }

    handleInputChange(event: Event, newValue: string = '') {
        const target = event.target;
        if (target instanceof HTMLInputElement ||
            target instanceof HTMLTextAreaElement) {
            this.setState({
                [target.name]: newValue,
            });
        }
    }

    handleSelectionChange(event: Event, key: string, value: string = '') {
        this.setState({
            leadMessage: value,
        });
    }

    render() {
        const { handleModalTouchTap, isOpen } = this.props;
        const {
            leadMessage,
            representativeMessage,
            sendLeadMessage,
            sendRepresentativeMessage,
        } = this.state;

        const actions = [
            <FlatButton
                label="Submit"
                name="submit"
                primary={true}
                onTouchTap={handleModalTouchTap}
            />,
            <FlatButton
                label="Cancel"
                name="cancel"
                secondary={true}
                onTouchTap={handleModalTouchTap}
            />,
        ];

        return (
            <Dialog
                actions={actions}
                autoScrollBodyContent={true}
                bodyStyle={{
                    minHeight: 300,
                    padding: '0 24px',
                }}
                contentStyle={{
                    minWidth: 300,
                    width: '75%',
                }}
                modal={true}
                open={isOpen}
                title="Messages"
            >
                <MessageBlock>
                    <Toggle
                        label="Send message to lead"
                        name="sendLeadMessage"
                        onToggle={this.handleInputChange}
                        style={{ width: 300 }}
                    />
                    <TextField
                        disabled={!sendLeadMessage}
                        floatingLabelText="Message to Lead"
                        fullWidth={true}
                        multiLine={true}
                        name="leadMessage"
                        onChange={this.handleInputChange}
                        value={leadMessage}
                    />
                </MessageBlock>
                <MessageBlock>
                    <Toggle
                        label="Send message to representative"
                        name="sendRepresentativeMessage"
                        onToggle={this.handleInputChange}
                        style={{ width: 300 }}
                    />
                    <TextField
                        disabled={!sendRepresentativeMessage}
                        floatingLabelText="Message to Representative"
                        fullWidth={true}
                        multiLine={true}
                        name="representativeMessage"
                        onChange={this.handleInputChange}
                        value={representativeMessage}
                    />
                </MessageBlock>
            </Dialog>
        );
    }
}

export default MessagesModal;
