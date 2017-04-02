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

export type CardEntity = {
    id: number,
    title: string,
    subtitle: string,
    contents: string,
};

type Props = {
    cardEntities: List<CardEntity>,
    handleAddTouchTap: (event: Event) => void,
    handleDeleteTouchTap?: (event: Event, cardEntity: CardEntity) => void,
    handleEditTouchTap?: (event: Event, cardEntity: CardEntity) => void,
    hasActions: boolean,
    searchFieldInclusions: Array<string>,
    showAddButton: boolean,
};

type State = {
    cardEntities: List<CardEntity>,
};

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
class CardList extends React.Component<*, Props, State> {
    props: Props;
    state: State;

    constructor(props: Props): void {
        super(props);
        this.state = {
            cardEntities: props.cardEntities,
        };
    }

    componentWillReceiveProps(nextProps: Props): void {
        const newCardContents = nextProps.cardEntities;
        this.setState({ cardEntities: newCardContents });
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
            handleDeleteTouchTap = () => {},
            handleEditTouchTap = () => {},
            hasActions,
            showAddButton,
        } = this.props;
        const { cardEntities } = this.state;

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
                            <CardText>
                                {cardEntity.contents}
                            </CardText>
                            {hasActions && <CardActions>
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

export default CardList;
