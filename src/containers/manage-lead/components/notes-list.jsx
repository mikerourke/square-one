/* External dependencies */
import React from 'react';
import moment from 'moment';
import { List } from 'material-ui/List';
import {
    Card,
    CardHeader,
    CardTitle,
    CardText,
} from 'material-ui/Card';

const apiData = require('../../../../internals/api/db.json');

class NotesList extends React.Component {
    props: {
        notes: any,
    };

    getSubtitleForNote(note) {
        const momentCreated = moment(note.createdAt);
        const createdDate = momentCreated.format('dddd, MMMM Do YYYY');
        const createdTime = momentCreated.format('h:mm a');
        return `Created on ${createdDate} at ${createdTime}`;
    }

    getFormattedNotes(notes) {
        return notes.map((note) => {
            const subtitle = this.getSubtitleForNote(note);
            return Object.assign({}, note, { subtitle });
        });
    }

    render() {
        const notesTest = this.getFormattedNotes(apiData.notes);
        return (
            <List
                style={{
                    alignItems: 'stretch',
                    display: 'flex',
                    flexFlow: 'row wrap',
                    justifyContent: 'flex-start',
                }}
            >
                {notesTest.map(note => (
                    <Card
                        key={note.id}
                        style={{
                            height: 150,
                            flex: '1 0 auto',
                            margin: 16,
                            minWidth: 300,
                            width: '30%',
                        }}
                    >
                        <CardHeader
                            title={note.title}
                            subtitle={note.subtitle}
                        />
                        <CardText>
                            {note.details}
                        </CardText>
                    </Card>
                ))}
            </List>
        );
    }
}

export default NotesList;
