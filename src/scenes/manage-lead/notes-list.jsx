/* @flow */

/* External dependencies */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

/* Internal dependencies */
import { getDisplayDate } from 'lib/display-formats';
import {
    createNote,
    deleteNote,
    updateNote,
} from 'state/entities/notes/actions';
import { selectNotesInLead } from 'state/entities/notes/selectors';
import { Lead, Note } from 'state/entities/models';
import CardList from 'components/card-list';
import ConfirmationDialog from 'components/confirmation-dialog';

/* Types */
import type { CardEntity } from 'components/card-list';

type DefaultProps = {
    createNote: (lead: Lead, note: Note) => Promise<*>,
    deleteNote: (lead: Lead, id: number) => Promise<*>,
    updateNote: (lead: Lead, note: Note) => Promise<*>,
    notes: List<Note>,
};

type Props = {
    createNote?: (lead: Lead, note: Note) => Promise<*>,
    deleteNote?: (lead: Lead, id: number) => Promise<*>,
    updateNote?: (lead: Lead, note: Note) => Promise<*>,
    showAddButton: boolean,
    lead: Lead,
    notes?: List<Note>,
};

type State = {
    activeNote: Note,
    isConfirmationDialogOpen: boolean,
    isEditDialogOpen: boolean,
    editDialogTitle: string,
};

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
export class NotesList extends Component<DefaultProps, Props, State> {
    props: Props;
    state: State;

    static defaultProps = {
        createNote: () => Promise.resolve(),
        deleteNote: () => Promise.resolve(),
        updateNote: () => Promise.resolve(),
        notes: new List(),
    };

    constructor(): void {
        super();
        this.state = {
            activeNote: new Note(),
            isConfirmationDialogOpen: false,
            isEditDialogOpen: false,
            editDialogTitle: '',
        };
    }

    /**
     * Returns the note associated with the specified ID from the Notes list
     *      in props.
     * @param {number} noteId ID of the note to find.
     * @returns {Note} Note associated with the ID.
     */
    getNoteById = (noteId: number): Note => {
        const { notes = new List() } = this.props;
        let foundNote;
        notes.forEach((note) => {
            if (note.id === noteId) {
                foundNote = note;
            }
        });
        if (foundNote) {
            return foundNote;
        }
        return new Note();
    };

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
    handleCardDeleteTouchTap = (event: Event, cardEntity: CardEntity): void => {
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
    handleCardEditTouchTap = (event: Event, cardEntity: CardEntity): void => {
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
        let deleteNoteFn: Function = () => Promise.resolve();
        if (this.props.deleteNote) {
            deleteNoteFn = this.props.deleteNote;
        }
        deleteNoteFn(lead, activeNote.id).then(() => {
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
        const { activeNote } = this.state;
        const { lead } = this.props;
        let createNoteFn: Function = () => Promise.resolve();
        if (this.props.createNote) {
            createNoteFn = this.props.createNote;
        }
        let updateNoteFn: Function = () => Promise.resolve();
        if (this.props.updateNote) {
            updateNoteFn = this.props.updateNote;
        }
        let performActionFn: Function = createNoteFn;
        if (activeNote.id !== 0) {
            performActionFn = updateNoteFn;
        }
        performActionFn(lead, activeNote).then(() => {
            this.setState({ isEditDialogOpen: false });
        });
    };

    /**
     * Updates the value of the corresponding field in local state for the
     *      active Note entity when the field value is changed.
     * @param {Event} event Event associated with the input.
     * @param {string} newValue Value of the input.
     */
    handleInputChange = (event: Event & {
        currentTarget: HTMLInputElement | HTMLTextAreaElement },
        newValue: string = ''): void => {
        const { activeNote } = this.state;
        const fieldName = event.currentTarget.name;
        const updatedNote = activeNote.set(fieldName, newValue);
        this.setState({ activeNote: updatedNote });
    };

    /**
     * Extrapolates the required properties for a card entity from the list of
     *      notes and returns a list of card entities.
     * @returns {Immutable.List}
     */
    getCardEntities = (): List<*> => {
        const notesInLead = this.props.notes;
        let cardEntities = new List();
        if (notesInLead) {
            cardEntities = notesInLead.map((note) => {
                const displayDate = getDisplayDate(note.createdAt);
                const newEntity = {
                    id: note.id,
                    title: note.getIn(['createdBy', 'fullName']),
                    subtitle: displayDate,
                    contents: note.contents,
                };
                return newEntity;
            });
        }
        return cardEntities;
    };

    render(): React.Element<*> {
        const { showAddButton } = this.props;
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
                    cardEntities={this.getCardEntities()}
                    handleAddTouchTap={this.handleAddButtonTouchTap}
                    handleDeleteTouchTap={this.handleCardDeleteTouchTap}
                    handleEditTouchTap={this.handleCardEditTouchTap}
                    hasActions={true}
                    searchFieldInclusions={['contents']}
                    showAddButton={showAddButton}
                />
                <Dialog
                    actions={editDialogActions}
                    open={isEditDialogOpen}
                    title={editDialogTitle}
                >
                    <form>
                        <TextField
                            floatingLabelText="Contents"
                            fullWidth={true}
                            multiLine={true}
                            name="contents"
                            onChange={this.handleInputChange}
                            type="submit"
                            value={activeNote.contents}
                        />
                    </form>
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
