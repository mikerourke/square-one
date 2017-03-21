/* @flow */

/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

/* Internal dependencies */
import {
    createItemInLead,
    deleteItemInLead,
} from 'state/entities/leads/actions';
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
    createNoteInLead: (leadId, group, item) =>
        dispatch(createItemInLead(leadId, group, item)),
    deleteNoteInLead: (leadId, group, noteId) =>
        dispatch(deleteItemInLead(leadId, group, noteId)),
});

class NotesList extends React.Component {
    props: {
        createNoteInLead: (leadId: number, group: string, item: Note) => void,
        deleteNoteInLead: (leadId: number, group: string,
                           itemId: number) => void,
        handleChange: (lead: Lead) => void,
        isAddButtonShown: boolean,
        lead: Lead,
        notes?: List<Note>,
    };

    state: {
        activeNoteId: number,
        editDialogTitle: string,
        isConfirmationDialogOpen: boolean,
        isEditDialogOpen: boolean,
    };

    constructor(props: any): void {
        super(props);
        this.state = {
            activeNoteId: 0,
            editDialogTitle: '',
            isConfirmationDialogOpen: false,
            isEditDialogOpen: false,
        };
    }

    handleAddButtonTouchTap = (event: Event): void => {
        event.preventDefault();
        this.showEditDialogForCard('Add New Note');
    };

    handleCardDeleteTouchTap = (event: Event, cardEntity: Object): void => {
        event.preventDefault();
        this.setState({
            activeNoteId: cardEntity.id,
            isConfirmationDialogOpen: true,
        });
    };

    handleCardEditTouchTap = (event: Event, cardEntity: Object): void => {
        event.preventDefault();
        this.showEditDialogForCard('Edit Note', cardEntity.id);
    };

    showEditDialogForCard = (title: string, noteId?: number = 0): void => {
        this.setState({
            activeNoteId: noteId,
            editDialogTitle: title,
            isEditDialogOpen: true,
        });
    };

    handleConfirmationNoTouchTap = (event: Event): void => {
        event.preventDefault();
        this.setState({ isConfirmationDialogOpen: false });
    };

    handleConfirmationYesTouchTap = (event: Event): void => {
        event.preventDefault();
        const { handleChange, lead } = this.props;
        const { activeNoteId } = this.state;
        const updatedLead = lead.deleteIn(['notes', activeNoteId]);
        const deleteNoteInLeadPromise: Function = this.props.deleteNoteInLead;
        deleteNoteInLeadPromise(lead.id, 'notes', activeNoteId).then(() => {
            this.setState({
                activeNoteId: 0,
                isConfirmationDialogOpen: false,
            });
            handleChange(updatedLead);
        });
    };

    handleEditDialogCancelTouchTap = (event: Event): void => {
        event.preventDefault();
        this.setState({ isEditDialogOpen: false });
    };

    handleEditDialogSaveTouchTap = (event: Event): void => {
        event.preventDefault();
        const { handleChange, lead } = this.props;
        const note = new Note({
            parentId: lead.id,
        });
        // TODO: Finish routines to create notes.
        const updatedLead = lead.updateIn(['notes'], notes => notes.push(note));
        const createNoteInLeadPromise: Function = this.props.createNoteInLead;
        createNoteInLeadPromise(updatedLead).then(() => {
            this.setState({ isEditDialogOpen: false });
            handleChange(updatedLead);
        });
    };

    render(): React.Element<*> {
        const { isAddButtonShown, notes } = this.props;
        const { isConfirmationDialogOpen, isEditDialogOpen } = this.state;

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
