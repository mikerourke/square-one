/* @flow */

/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

/* Internal dependencies */
import { Lead, Note } from 'state/entities/models';
import ActionButton from 'components/action-button';
import CardList from 'components/card-list';

const mapStateToProps = (state, ownProps) => {
    const entitiesPath = ['entities', 'leads', 'entities'];
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

class NotesList extends React.Component {
    props: {
        isAddButtonShown: boolean,
        lead: Lead,
        notes?: List<Note>,
    };

    state: {
        isDialogOpen: boolean,
    };

    constructor(): void {
        super();
        this.state = {
            isDialogOpen: false,
        };
    }

    handleAddButtonTouchTap = (event: Event): void => {
        event.preventDefault();
        this.setState({ isDialogOpen: true });
    };

    handleCardTouchTap = (event: Event): void => {
        console.log(event);
    };

    handleDialogButtonTouchTap = (event: Event, action: string) => {
        event.preventDefault();
    };

    render(): React.Element<*> {
        const { isAddButtonShown, notes } = this.props;
        const { isDialogOpen } = this.state;

        const dialogActions = [
            <FlatButton
                label="Save"
                onTouchTap={(event: Event) =>
                    this.handleDialogButtonTouchTap(event, 'save')}
                primary={true}
            />,
            <FlatButton
                label="Cancel"
                name="cancel"
                onTouchTap={(event: Event) =>
                    this.handleDialogButtonTouchTap(event, 'cancel')}
                secondary={true}
            />,
        ];

        return (
            <div>
                <CardList
                    cardContents={notes}
                    handleTouchTap={this.handleCardTouchTap}
                />
                {isAddButtonShown && (
                    <ActionButton
                        handleTouchTap={this.handleAddButtonTouchTap}
                        iconName="add"
                    />
                )}
                <Dialog
                    actions={dialogActions}
                    open={isDialogOpen}
                    title="Add new note"
                >
                    Test!
                </Dialog>
            </div>
        );
    }
}

export default connect(mapStateToProps)(NotesList);
