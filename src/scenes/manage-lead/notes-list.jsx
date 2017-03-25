/* @flow */

/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

/* Internal dependencies */
import {
    createNote,
    deleteNote,
    updateNote,
} from 'state/entities/notes/actions';
import { selectNotesInLead } from 'state/entities/notes/selectors';
import { Lead, Note } from 'state/entities/models';
import ActionButton from 'components/action-button';
import CardList from 'components/card-list';
import ConfirmationDialog from 'components/confirmation-dialog';

const mapStateToProps = (state, ownProps) => ({
    notes: selectNotesInLead(state, ownProps),
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    createNote: (lead, note) => dispatch(createNote(lead, note)),
    deleteNote: (lead, id) => dispatch(deleteNote(lead, id)),
    updateNote: (lead, note) => dispatch(updateNote(lead, note)),
});

export class NotesList extends React.Component {
    props: {
        createNote?: () => void,
        deleteNote?: () => void,
        showAddButton: boolean,
        lead: Lead,
        notes?: List<Note>,
        updateNote?: () => void,
    };

    state: {
        activeNote: Note,
        editDialogTitle: string,
        isConfirmationDialogOpen: boolean,
        isEditDialogOpen: boolean,
    };

    constructor(): void {
        super();
        this.state = {
            activeNote: new Note(),
            editDialogTitle: '',
            isConfirmationDialogOpen: false,
            isEditDialogOpen: false,
        };
    }

    getNoteById = noteId => this.props.notes.find(note => note.id === noteId);

    handleAddButtonTouchTap = (event: Event): void => {
        event.preventDefault();
        this.setState({
            activeNote: new Note(),
            editDialogTitle: 'Add Note',
            isEditDialogOpen: true,
        });
    };

    handleCardDeleteTouchTap = (event: Event, cardEntity: Object): void => {
        event.preventDefault();
        const activeNote = this.getNoteById(cardEntity.id);
        this.setState({
            activeNote,
            isConfirmationDialogOpen: true,
        });
    };

    handleCardEditTouchTap = (event: Event, cardEntity: Object): void => {
        event.preventDefault();
        const activeNote = this.getNoteById(cardEntity.id);
        console.log(activeNote);
        this.setState({
            activeNote,
            editDialogTitle: 'Edit Note',
            isEditDialogOpen: true,
        });
    };

    handleConfirmationNoTouchTap = (event: Event): void => {
        event.preventDefault();
        this.setState({ isConfirmationDialogOpen: false });
    };

    handleConfirmationYesTouchTap = (event: Event): void => {
        event.preventDefault();
        const { activeNote } = this.state;
        const { lead } = this.props;
        const deleteNotePromise = this.props.deleteNote;
        deleteNotePromise(lead, activeNote.id).then(() => {
            this.setState({ isConfirmationDialogOpen: false });
        });
    };

    handleEditDialogCancelTouchTap = (event: Event): void => {
        event.preventDefault();
        this.setState({ isEditDialogOpen: false });
    };

    handleEditDialogSaveTouchTap = (event: Event): void => {
        event.preventDefault();
        const { activeNote } = this.state;
        const { lead } = this.props;
        let performActionPromise: Function = this.props.createNote;
        if (activeNote.id !== 0) {
            performActionPromise = this.props.updateNote;
        }
        performActionPromise(lead, activeNote).then(() => {
            this.setState({ isEditDialogOpen: false });
        });
    };

    handleInputChange = (event: Event, newValue: string = ''): void => {
        const { activeNote } = this.state;
        const target = event.target;

        // The element type is checked to conform with Flow type checking.
        if (target instanceof HTMLInputElement ||
            target instanceof HTMLTextAreaElement) {
            const fieldName = target.name;
            const updatedNote = activeNote.set(fieldName, newValue);
            this.setState({ activeNote: updatedNote });
        }
    };

    render(): React.Element<*> {
        const { showAddButton, notes } = this.props;
        const {
            activeNote,
            editDialogTitle,
            isConfirmationDialogOpen,
            isEditDialogOpen,
        } = this.state;

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
                    searchFieldInclusions={['contents']}
                />
                {showAddButton && (
                    <ActionButton
                        handleTouchTap={this.handleAddButtonTouchTap}
                        iconName="add"
                    />
                )}
                <Dialog
                    actions={editDialogActions}
                    open={isEditDialogOpen}
                    title={editDialogTitle}
                >
                    <TextField
                        floatingLabelText="Contents"
                        fullWidth={true}
                        multiLine={true}
                        name="contents"
                        onChange={this.handleInputChange}
                        value={activeNote.contents}
                    />
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
