/* @flow */

/* External dependencies */
import React from 'react';
import {
    Card,
    CardActions,
    CardHeader,
    CardText,
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { List as MuiList } from 'material-ui/List';

/* Internal dependencies */
import { getSearchResults } from 'lib/query-actions';
import SearchToolbar from 'components/search-toolbar';

/* Types */
import type { List } from 'immutable';

/**
 * List of card components.
 * @param {List} cardContents List of data objects to display on card.
 * @param {Function} handleDeleteTouchTap Action to perform when the Delete
 *      button is pressed.
 * @param {Function} handleSaveTouchTap Action to perform when the Save button
 *      is pressed.
 * @param {Array} searchFieldInclusions Fields within the Card contents
 *      array that should be included in searches.
 */
export default class CardList extends React.Component {
    props: {
        cardContents: List<*>,
        handleDeleteTouchTap: (event: Event, cardEntity: Object) => void,
        handleEditTouchTap: (event: Event, cardEntity: Object) => void,
        searchFieldInclusions: Array<string>,
    };

    state: {
        cardContents: List<*>,
    };

    constructor(props: any): void {
        super(props);
        this.state = {
            cardContents: this.props.cardContents,
        };
    }

    componentWillReceiveProps(nextProps: any): void {
        const { cardContents } = this.state;
        const newCardContents = nextProps.cardContents;
        if (newCardContents.size !== cardContents.size) {
            this.setState({
                cardContents: newCardContents,
            });
        }
    }

    /**
     * Limits the Cards displayed on the page to only those containing the
     *      specified value entered in the Search box.
     * @param {Event} event Event object associated with Search box.
     * @param {string} newValue Value to search by.
     */
    handleSearchBoxChange = (event: Event, newValue: string): void => {
        const { cardContents, searchFieldInclusions } = this.props;
        const results = getSearchResults(
            cardContents, newValue, searchFieldInclusions);
        this.setState({ cardContents: results });
    };

    render(): React.Element<*> {
        const { handleDeleteTouchTap, handleEditTouchTap } = this.props;
        const { cardContents } = this.state;

        return (
            <div>
                <SearchToolbar
                    handleSearchBoxChange={this.handleSearchBoxChange}
                    isStandalone={false}
                />
                <MuiList
                    style={{
                        alignItems: 'stretch',
                        display: 'flex',
                        flexFlow: 'row wrap',
                        justifyContent: 'flex-start',
                    }}
                >
                    {cardContents.map(cardEntity => (
                        <Card
                            key={cardEntity.id}
                            style={{
                                flex: '1 0 auto',
                                margin: 16,
                                minWidth: 300,
                                width: '30%',
                            }}
                        >
                            <CardHeader
                                subtitle={cardEntity.createdAt}
                                title={cardEntity.createdBy}
                            />
                            <CardText
                                style={{
                                    maxHeight: 48,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {cardEntity.contents}
                            </CardText>
                            <CardActions>
                                <FlatButton
                                    id="card-edit"
                                    label="Edit"
                                    onTouchTap={(event: Event) =>
                                        handleEditTouchTap(event, cardEntity)}
                                    style={{ minWidth: 72 }}
                                />
                                <FlatButton
                                    id="card-delete"
                                    label="Delete"
                                    onTouchTap={(event: Event) =>
                                        handleDeleteTouchTap(event, cardEntity)}
                                    style={{ minWidth: 72 }}
                                />
                            </CardActions>
                        </Card>
                    ))}
                </MuiList>
            </div>
        );
    }
}
