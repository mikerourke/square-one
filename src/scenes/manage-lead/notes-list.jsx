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

/**
 * List of notes associated with a Lead entity.
 * @param {boolean} showAddButton Indicates if the add button should be shown
 *      for creating new notes.
 * @param {Lead} lead Parent Lead containing the notes.
 */
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

    getNoteById = (noteId: number): Note =>
        this.props.notes.find(note => note.id === noteId);

    /**
     * Creates a new Note in local state and show the Add/Edit Dialog when the
     *      Add button is pressed.
     * @param {Event} event Event associated with the Add button.
     */
    handleAddButtonTouchTap = (event: Event): void => {
        event.preventDefault();
        this.setState({
            activeNote: new Note(),
            editDialogTitle: 'Add Note',
            isEditDialogOpen: true,
        });
    };

    /**
     * Stores the selected Note in local state and shows the Confirmation
     *      Dialog when the Delete button is pressed on a Note card.
     * @param {Event} event Event associated with the Delete button.
     * @param {Object} cardEntity Entity associated with the selected card.
     */
    handleCardDeleteTouchTap = (event: Event, cardEntity: Object): void => {
        event.preventDefault();
        const activeNote = this.getNoteById(cardEntity.id);
        this.setState({
            activeNote,
            isConfirmationDialogOpen: true,
        });
    };

    /**
     * Stores the selected Note in local state and shows the Add/Edit Dialog
     *      when the Edit button is pressed on a Note card.
     * @param {Event} event Event associated with the Edit button.
     * @param {Object} cardEntity Entity associated with the selected card.
     */
    handleCardEditTouchTap = (event: Event, cardEntity: Object): void => {
        event.preventDefault();
        const activeNote = this.getNoteById(cardEntity.id);
        this.setState({
            activeNote,
            editDialogTitle: 'Edit Note',
            isEditDialogOpen: true,
        });
    };

    /**
     * Hides the Confirmation Dialog if the No button is pressed.
     * @param {Event} event Event associated with the Cancel button.
     */
    handleConfirmationNoTouchTap = (event: Event): void => {
        event.preventDefault();
        this.setState({ isConfirmationDialogOpen: false });
    };

    /**
     * Dispatches a delete note action when the Yes button is pressed in the
     *      Confirmation Dialog and closes.
     * @param {Event} event Event associated with the Yes button.
     */
    handleConfirmationYesTouchTap = (event: Event): void => {
        event.preventDefault();
        const { activeNote } = this.state;
        const { lead } = this.props;
        const deleteNotePromise = this.props.deleteNote;
        deleteNotePromise(lead, activeNote.id).then(() => {
            this.setState({ isConfirmationDialogOpen: false });
        });
    };

    /**
     * Closes the Add/Edit Dialog if the Cancel button is pressed.
     * @param {Event} event Event associated with the Cancel button.
     */
    handleEditDialogCancelTouchTap = (event: Event): void => {
        event.preventDefault();
        this.setState({ isEditDialogOpen: false });
    };

    /**
     * Dispatches either a create note or update note action depending on if
     *      the Note is new or existing when the Save button is pressed in the
     *      Add/Edit Dialog.
     * @param {Event} event Event associated with the Save button.
     */
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

    /**
     * Updates the value of the corresponding field in local state for the
     *      active Note entity when the field value is changed.
     * @param {Event} event Event associated with the input.
     * @param {string} newValue Value of the input.
     */
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
        const { notes, showAddButton } = this.props;
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
