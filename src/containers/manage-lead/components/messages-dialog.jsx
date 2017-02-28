/* @flow */

/* External dependencies */
import React from 'react';
import styled from 'styled-components';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

/**
 * Styled container for the message block.
 */
const MessageBlock = styled.div`
    margin: 24px 0;
`;

/**
 * Modal dialog for specifying messages that get sent to Leads and
 *      Representatives.
 * @param {Function} handleModalTouchTap Action to perform when the buttons
 *      on the dialog are pressed.
 * @param {boolean} isOpen Indicates if the dialog is open.
 */
export default class MessagesDialog extends React.Component {
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

    constructor(): void {
        super();

        this.state = {
            leadMessage: '',
            representativeMessage: '',
            sendLeadMessage: false,
            sendRepresentativeMessage: false,
        };
    }

    /**
     * Updates the state with the contents of the updated input.
     * @param {Event} event Event associated with the input.
     * @param {string} newValue New value of the input.
     */
    handleInputChange = (event: Event, newValue: string = ''): void => {
        const target = event.target;

        // The element type is checked to conform with Flow type checking.
        if (target instanceof HTMLInputElement ||
            target instanceof HTMLTextAreaElement) {
            this.setState({
                [target.name]: newValue,
            });
        }
    };

    render(): React.Element<*> {
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
