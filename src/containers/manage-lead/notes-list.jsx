/* @flow */

/* External dependencies */
import React from 'react';

/* Internal dependencies */
import { Note } from 'state/entities/models';
import CardList from 'components/card-list';

/* Types */
import type { List } from 'immutable';

export default class NotesList extends React.Component {
    props: {
        notes: List<Note>,
    };

    handleTouchTap = (event: Event) => {
        console.log(event);
    };

    render() {
        const { notes } = this.props;

        return (
            <CardList
                cardContents={notes}
                handleTouchTap={this.handleTouchTap}
            />
        );
    }
}
