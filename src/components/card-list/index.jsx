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
import ActionButton from 'components/action-button';
import SearchToolbar from 'components/search-toolbar';

/* Types */
import type { List } from 'immutable';

/**
 * List of card components.
 * @param {List} cardEntities List of data objects to display on card.
 * @param {Function} handleAddTouchTap Action to perform when the Add button
 *      is pressed.
 * @param {Function} [handleDeleteTouchTap] Action to perform when the Delete
 *      button is pressed.
 * @param {Function} [handleEditTouchTap] Action to perform when the Edit button
 *      is pressed.
 * @param {boolean} hasActions Indicates if the card has actions that can
 *      be performed.
 * @param {Array} searchFieldInclusions Fields within the Card contents
 *      array that should be included in searches.
 * @param {boolean} showAddButton Indicates if the Add button should be shown.
 */
export default class CardList extends React.Component {
    props: {
        cardEntities: List<*>,
        handleAddTouchTap: (event: Event) => void,
        handleDeleteTouchTap?: ?(event: Event, cardEntity: Object) => void,
        handleEditTouchTap?: ?(event: Event, cardEntity: Object) => void,
        hasActions: boolean,
        searchFieldInclusions: Array<string>,
        showAddButton: boolean,
    };

    state: {
        cardEntities: List<*>,
    };

    constructor(props: any): void {
        super(props);
        this.state = {
            cardEntities: this.props.cardEntities,
        };
    }

    componentWillReceiveProps(nextProps: any): void {
        const { cardEntities } = this.state;
        const newCardContents = nextProps.cardEntities;
        if (newCardContents.size !== cardEntities.size) {
            this.setState({
                cardEntities: newCardContents,
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
        const { cardEntities, searchFieldInclusions } = this.props;
        const results = getSearchResults(
            cardEntities, newValue, searchFieldInclusions);
        this.setState({ cardEntities: results });
    };

    render(): React.Element<*> {
        const {
            handleAddTouchTap,
            handleDeleteTouchTap,
            handleEditTouchTap,
            hasActions,
            showAddButton,
        } = this.props;
        const { cardEntities } = this.state;

        let handleEditFn = () => {};
        if (handleEditTouchTap) {
            handleEditFn = handleEditTouchTap;
        }
        let handleDeleteFn = () => {};
        if (handleDeleteTouchTap) {
            handleDeleteFn = handleDeleteTouchTap;
        }

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
                    {cardEntities.map(cardEntity => (
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
                                subtitle={cardEntity.subtitle}
                                title={cardEntity.title}
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
                            {hasActions && <CardActions>
                                <FlatButton
                                    id="card-edit"
                                    label="Edit"
                                    onTouchTap={(event: Event) =>
                                        handleEditFn(event, cardEntity)}
                                    style={{ minWidth: 72 }}
                                />
                                <FlatButton
                                    id="card-delete"
                                    label="Delete"
                                    onTouchTap={(event: Event) =>
                                        handleDeleteFn(event, cardEntity)}
                                    style={{ minWidth: 72 }}
                                />
                            </CardActions>}
                        </Card>
                    ))}
                </MuiList>
                {showAddButton && (
                    <ActionButton
                        handleTouchTap={handleAddTouchTap}
                        iconName="add"
                    />
                )}
            </div>
        );
    }
}
