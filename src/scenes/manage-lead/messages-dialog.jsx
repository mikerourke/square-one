/* @flow */

/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import styled from 'styled-components';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

/* Internal dependencies */
import { createMessage } from 'state/entities/messages/actions';
import { Lead, Message } from 'state/entities/models';
import ConfirmationDialog from 'components/confirmation-dialog';

/**
 * Styled container for the message block.
 */
const MessageBlock = styled.div`
    margin: 24px 0;
`;

const mapStateToProps = (state, ownProps) => ({
    lead: ownProps.lead,
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    createMessage: (lead, message) => dispatch(createMessage(lead, message)),
});

/**
 * Modal dialog for specifying messages that get sent to Leads and
 *      Representatives.
 * @param {Function} handleTouchTap Action to perform when any button on the
 *      dialog is pressed.
 * @param {boolean} open Indicates if the dialog is open.
 */
export class MessagesDialog extends React.Component {
    props: {
        handleTouchTap: (event: Event) => void,
        lead: Lead,
        open: boolean,
    };

    state: {
        isConfirmationDialogOpen: boolean,
        leadMessage: string,
        representativeMessage: string,
        sendLeadMessage: boolean,
        sendRepresentativeMessage: boolean,
    };

    constructor(props: any): void {
        super(props);

        this.state = {
            isConfirmationDialogOpen: false,
            messageToLead: '',
            messageToRepresentative: '',
            sendLeadMessage: false,
            sendRepresentativeMessage: false,
        };
    }

    handleCancelTouchTap = (event: Event): void => {
        event.preventDefault();
        this.setState({ isConfirmationDialogOpen: true });
    };

    handleSubmitTouchTap = (event: Event): void => {
        event.preventDefault();
        const { lead } = this.props;
        const { messageToLead, messageToRepresentative } = this.state;
        const createMessagePromise = this.props.createMessage;
        const leadMessage = new Message({
            messageType: 'text',
            recipient: lead.phone,
            subject: '?',
            body: messageToLead,
        });
        createMessagePromise(lead, leadMessage).then(() => {
            this.setState({ isConfirmationDialogOpen: false });
            browserHistory.push('/leads');
        });
    };

    /**
     * If the user does not wish to lose their changes, hide the dialog.
     * @param {Event} event Event associated with the control.
     */
    handleConfirmationNoTouchTap = (event: Event): void => {
        event.preventDefault();
        this.setState({ isConfirmationDialogOpen: false });
    };

    /**
     * If the user confirms that they want to exit the page, redirect to the
     *      Leads List.
     * @param {Event} event Event associated with the control.
     */
    handleConfirmationYesTouchTap = (event: Event): void => {
        event.preventDefault();
        const { handleTouchTap } = this.props;
        this.setState({ isConfirmationDialogOpen: false });
        handleTouchTap(event);
    };

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
        const { open } = this.props;

        const {
            isConfirmationDialogOpen,
            messageToLead,
            messageToRepresentative,
            sendLeadMessage,
            sendRepresentativeMessage,
        } = this.state;

        const actions = [
            <FlatButton
                label="Submit"
                name="submit"
                primary={true}
                onTouchTap={this.handleSubmitTouchTap}
            />,
            <FlatButton
                label="Cancel"
                name="cancel"
                secondary={true}
                onTouchTap={this.handleCancelTouchTap}
            />,
        ];

        return (
            <div>
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
                    open={open}
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
                            name="messageToLead"
                            onChange={this.handleInputChange}
                            value={messageToLead}
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
                            name="messageToRepresentative"
                            onChange={this.handleInputChange}
                            value={messageToRepresentative}
                        />
                    </MessageBlock>
                </Dialog>
                <ConfirmationDialog
                    handleNoTouchTap={this.handleConfirmationNoTouchTap}
                    handleYesTouchTap={this.handleConfirmationYesTouchTap}
                    message="Are you sure you wish to cancel?"
                    open={isConfirmationDialogOpen}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesDialog);
