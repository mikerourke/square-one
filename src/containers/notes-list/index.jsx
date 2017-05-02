/* @flow */

/* External dependencies */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';

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
import EditNoteDialog from './edit-dialog';

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
    note: Note,
    isConfirmationDialogOpen: boolean,
    isEditDialogOpen: boolean,
    editDialogTitle: string,
};

const mapStateToProps = (state, ownProps) => ({
    notes: selectNotesInLead(state, ownProps),
    allNotes: state.getIn(['entities', 'notes', 'byId']),
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
            note: new Note(),
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
     */
    handleAddButtonTouchTap = (): void => {
        this.setState({
            note: new Note(),
            editDialogTitle: 'Add Note',
            isEditDialogOpen: true,
        });
    };

    /**
     * Stores the selected Note in local state and shows the Confirmation
     *      Dialog when the Delete button is pressed on a Note card.
     * @param {Object} cardEntity Entity associated with the selected card.
     */
    handleCardDeleteTouchTap = (cardEntity: CardEntity): void => {
        const note = this.getNoteById(cardEntity.id);
        this.setState({
            note,
            isConfirmationDialogOpen: true,
        });
    };

    /**
     * Stores the selected Note in local state and shows the Add/Edit Dialog
     *      when the Edit button is pressed on a Note card.
     * @param {Object} cardEntity Entity associated with the selected card.
     */
    handleCardEditTouchTap = (cardEntity: CardEntity): void => {
        const note = this.getNoteById(cardEntity.id);
        this.setState({
            note,
            editDialogTitle: 'Edit Note',
            isEditDialogOpen: true,
        });
    };

    /**
     * Hides the Confirmation Dialog if the No button is pressed.
     */
    handleConfirmationNoTouchTap = (): void => {
        this.setState({ isConfirmationDialogOpen: false });
    };

    /**
     * Dispatches a delete note action when the Yes button is pressed in the
     *      Confirmation Dialog and closes.
     */
    handleConfirmationYesTouchTap = (): void => {
        const { note } = this.state;
        const { lead } = this.props;
        let deleteNoteFn = () => Promise.resolve();
        if (this.props.deleteNote) {
            deleteNoteFn = this.props.deleteNote;
        }
        deleteNoteFn(lead, note.id).then(() => {
            this.setState({
                note: new Note(),
                isConfirmationDialogOpen: false,
            });
        });
    };

    /**
     * Closes the Add/Edit Dialog if the Cancel button is pressed.
     */
    handleEditDialogCancelTouchTap = (): void => {
        this.setState({ isEditDialogOpen: false });
    };

    /**
     * Dispatches either a create note or update note action depending on if
     *      the Note is new or existing when the Save button is pressed in the
     *      Add/Edit Dialog.
     */
    handleEditDialogSaveTouchTap = (): void => {
        const { note } = this.state;
        const { lead } = this.props;
        let createNoteFn = () => Promise.resolve();
        if (this.props.createNote) {
            createNoteFn = this.props.createNote;
        }
        let updateNoteFn = () => Promise.resolve();
        if (this.props.updateNote) {
            updateNoteFn = this.props.updateNote;
        }
        let performActionFn = createNoteFn;
        if (note.id !== 0) {
            performActionFn = updateNoteFn;
        }
        performActionFn(lead, note).then(() => {
            this.setState({
                note: new Note(),
                isEditDialogOpen: false,
            });
        });
    };

    /**
     * Updates the value of the corresponding field in local state for the
     *      active Note entity when the field value is changed.
     * @param {Event} event Event associated with the input.
     * @param {string} newValue Value of the input.
     */
    handleInputChange = (
        event: Event & {
            currentTarget: HTMLInputElement | HTMLTextAreaElement,
        },
        newValue: string = '',
    ): void => {
        const { note } = this.state;
        const fieldName = event.currentTarget.name;
        const updatedNote = note.set(fieldName, newValue);
        this.setState({ note: updatedNote });
    };

    /**
     * Extrapolates the required properties for a card entity from the list of
     *      notes and returns a list of card entities.
     * @returns {List} List of card entities to display.
     */
    getCardEntities = (): List<*> => {
        let cardEntities = new List();
        const notesInLead = this.props.notes;
        if (notesInLead) {
            cardEntities = notesInLead
                .sortBy(note => note.createdAt)
                .reverse()
                .map(note => ({
                    id: note.id,
                    title: note.getIn(['createdBy', 'fullName']),
                    subtitle: getDisplayDate(note.createdAt),
                    contents: note.contents,
                }));
        }
        return cardEntities;
    };

    render(): React.Element<*> {
        const { showAddButton } = this.props;
        const {
            note,
            editDialogTitle,
            isConfirmationDialogOpen,
            isEditDialogOpen,
        } = this.state;

        // FIXME: Fix this so it renders new notes.
        const cardEntities = this.getCardEntities();

        return (
            <div>
                <CardList
                    cardEntities={cardEntities}
                    handleAddTouchTap={this.handleAddButtonTouchTap}
                    handleDeleteTouchTap={this.handleCardDeleteTouchTap}
                    handleEditTouchTap={this.handleCardEditTouchTap}
                    hasActions={true}
                    multipleCardsPerRow={true}
                    searchFieldInclusions={['contents']}
                    showAddButton={showAddButton}
                />
                <EditNoteDialog
                    handleSaveTouchTap={this.handleEditDialogSaveTouchTap}
                    handleCancelTouchTap={this.handleEditDialogCancelTouchTap}
                    handleInputChange={this.handleInputChange}
                    title={editDialogTitle}
                    contents={note.contents}
                    open={isEditDialogOpen}
                />
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
