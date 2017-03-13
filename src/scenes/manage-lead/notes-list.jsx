/* @flow */

/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

/* Internal dependencies */
import { createNoteInLead } from 'state/entities/leads/actions';
import { Lead, Note } from 'state/entities/models';
import ActionButton from 'components/action-button';
import CardList from 'components/card-list';
import ConfirmationDialog from 'components/confirmation-dialog';

const mapStateToProps = (state, ownProps) => {
    const lead = ownProps.lead;
    let notes = new List();
    if (lead.leadId !== 0) {
        notes = lead.get('notes').toList();
    }
    return {
        lead,
        notes,
    };
};

const mapDispatchToProps = dispatch => ({
    dispatch,
    createNoteInLead: lead => dispatch(createNoteInLead(lead)),
});

class NotesList extends React.Component {
    props: {
        isAddButtonShown: boolean,
        lead: Lead,
        notes?: List<Note>,
    };

    state: {
        isConfirmationDialogOpen: boolean,
        isEditDialogOpen: boolean,
    };

    constructor(): void {
        super();
        this.state = {
            isConfirmationDialogOpen: false,
            isEditDialogOpen: false,
        };
    }

    handleAddButtonTouchTap = (event: Event): void => {
        event.preventDefault();
        this.setState({ isEditDialogOpen: true });
    };

    handleCardDeleteTouchTap = (event: Event, cardEntity: Object): void => {
        event.preventDefault();
        console.log(cardEntity);
        this.setState({ isConfirmationDialogOpen: true });
    };

    handleCardEditTouchTap = (event: Event, cardEntity: Object): void => {
        event.preventDefault();
        console.log(cardEntity);
        this.setState({ isEditDialogOpen: true });
    };

    handleConfirmationYesTouchTap = (event: Event): void => {
        event.preventDefault();
        const { lead } = this.props;

        this.setState({ isConfirmationDialogOpen: false });
    };

    handleConfirmationNoTouchTap = (event: Event): void => {
        event.preventDefault();
        this.setState({ isConfirmationDialogOpen: false });
    };

    handleEditDialogCancelTouchTap = (event: Event): void => {
        event.preventDefault();
        this.setState({ isEditDialogOpen: false });
    };

    handleEditDialogSaveTouchTap = (event: Event): void => {
        event.preventDefault();
        const { createNoteInLead, lead } = this.props;
        const note = new Note({
            parentId: lead.id,
        });
        // TODO: Finish routines to create notes.
        const updatedLead = lead.updateIn(['notes'], notes => notes.push(note));
        console.log(updatedLead);
        createNoteInLead(updatedLead).then(() => {
            this.setState({ isEditDialogOpen: false });
        });
    };

    render(): React.Element<*> {
        const { isAddButtonShown, notes } = this.props;
        const { isConfirmationDialogOpen, isEditDialogOpen} = this.state;

        const editDialogActions = [
            <FlatButton
                label="Save"
                onTouchTap={this.handleEditDialogSaveTouchTap}
                primary={true}
            />,
            <FlatButton
                label="Cancel"
                name="cancel"
                onTouchTap={this.handleEditDialogCancelTouchTap}
                secondary={true}
            />,
        ];

        return (
            <div>
                <CardList
                    cardContents={notes}
                    handleDeleteTouchTap={this.handleCardDeleteTouchTap}
                    handleEditTouchTap={this.handleCardEditTouchTap}
                />
                {isAddButtonShown && (
                    <ActionButton
                        handleTouchTap={this.handleAddButtonTouchTap}
                        iconName="add"
                    />
                )}
                <Dialog
                    actions={editDialogActions}
                    open={isEditDialogOpen}
                    title="Add/Edit Note"
                >
                    Test!
                </Dialog>
                <ConfirmationDialog
                    handleNoTouchTap={this.handleConfirmationNoTouchTap}
                    handleYesTouchTap={this.handleConfirmationYesTouchTap}
                    message="Are you sure you want to delete this note?"
                    open={isConfirmationDialogOpen}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesList);
