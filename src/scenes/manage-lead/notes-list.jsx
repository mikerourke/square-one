/* @flow */

/* External dependencies */
import React from 'react';
import { List } from 'immutable';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

/* Internal dependencies */
import { Note } from 'state/entities/models';
import ActionButton from 'components/action-button';
import CardList from 'components/card-list';
import ConfirmationDialog from 'components/confirmation-dialog';

export default class NotesList extends React.Component {
    props: {
        handleNoteDelete: (id: number) => void,
        handleNoteUpdate: (note: Note) => void,
        isAddButtonShown: boolean,
        notes?: List<Note>,
    };

    state: {
        activeNoteId: number,
        editDialogTitle: string,
        isConfirmationDialogOpen: boolean,
        isEditDialogOpen: boolean,
    };

    constructor(): void {
        super();
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
        const { handleNoteDelete } = this.props;
        const { activeNoteId } = this.state;
        handleNoteDelete(activeNoteId);
        this.setState({
            activeNoteId: 0,
            isConfirmationDialogOpen: false,
        });
    };

    handleEditDialogCancelTouchTap = (event: Event): void => {
        event.preventDefault();
        this.setState({ isEditDialogOpen: false });
    };

    handleEditDialogSaveTouchTap = (event: Event): void => {
        event.preventDefault();
        const { handleNoteUpdate } = this.props;
        const note = new Note({
        });
        handleNoteUpdate(note);
        this.setState({ isEditDialogOpen: false });
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
