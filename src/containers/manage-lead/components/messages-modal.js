import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

const MessageBlock = styled.div`
    margin: 24px 0;
`;

class MessagesModal extends Component {
    static propTypes = {
        handleModalTouchTap: PropTypes.func.isRequired,
        isOpen: PropTypes.bool.isRequired,
    };

    constructor(props, context) {
        super(props, context);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectionChange = this.handleSelectionChange.bind(this);
    }

    state = {
        leadMessage: '',
        representativeMessage: '',
        sendLeadMessage: false,
        sendRepresentativeMessage: false,
    };

    handleInputChange(event, newValue) {
        this.setState({
            [event.target.name]: newValue,
        });
    }

    handleSelectionChange(event, key, payload) {
        this.setState({
            leadMessage: payload,
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

        const messages = [
            { id: 1, value: 'This is the first message.' },
            { id: 2, value: 'This is the second message.' },
            { id: 3, value: 'This is the third message.' },
        ];

        return (
            <Dialog
                actions={actions}
                contentStyle={{
                    width: '75%',
                    minWidth: 300,
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
                    <SelectField
                        disabled={!sendLeadMessage}
                        floatingLabelText="Message"
                        fullWidth={true}
                        onChange={this.handleSelectionChange}
                    >
                        {messages.map(message => (
                            <MenuItem
                                key={message.id}
                                primaryText={message.value}
                                value={message.value}
                            />
                        ))}
                    </SelectField>
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
