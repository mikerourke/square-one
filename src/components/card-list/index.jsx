/* @flow */

/* External dependencies */
import React from 'react';
import {
    Card,
    CardActions,
    CardHeader,
    CardText,
    CardTitle,
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import { List as MuiList } from 'material-ui/List';

/* Internal dependencies */
import { primary1Color } from 'style/mui/palette';
import { getSearchResults, getSortedData } from 'lib/query-actions';
import SearchToolbar from 'components/search-toolbar';

/* Types */
import type { List } from 'immutable';

/**
 * List of card components.
 * @param {List} cardContents List of data objects to display on card.
 * @param {Function} handleTouchTap Action to perform when an element is
 *      pressed.
 * @param {Array} [searchFieldExclusions=[]] Fields within the Card contents
 *      array that should be excluded from searches.
 */
export default class CardList extends React.Component {
    props: {
        cardContents: List<*>,
        handleTouchTap: (event: Event) => void,
        searchFieldExclusions?: Array<string>,
    };

    state: {
        cardContents: List<*>,
    };

    static defaultProps = {
        searchFieldExclusions: [],
    };

    constructor(props: any): void {
        super(props);
        this.state = {
            cardContents: this.props.cardContents,
        };
    }

    /**
     * Limits the Cards displayed on the page to only those containing the
     *      specified value entered in the Search box.
     * @param {Event} event Event object associated with Search box.
     * @param {string} newValue Value to search by.
     */
    handleSearchBoxChange = (event: Event, newValue: string): void => {
        const { cardContents, searchFieldExclusions } = this.props;
        let exclusions = [];
        if (searchFieldExclusions) {
            exclusions = searchFieldExclusions;
        }
        const results = getSearchResults(cardContents, newValue, exclusions);
        this.setState({ cardContents: results });
    };

    render(): React.Element<*> {
        const { handleTouchTap } = this.props;
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
                            containerStyle={{  }}
                            style={{
                                flex: '1 0 auto',
                                margin: 16,
                                minWidth: 300,
                                width: '30%',
                            }}
                        >
                            <CardHeader
                                subtitle={cardEntity.createdAt}
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
                                {cardEntity.details}
                            </CardText>
                            <CardActions>
                                <FlatButton
                                    id="card-edit"
                                    label="Edit"
                                    onTouchTap={handleTouchTap}
                                    primary={true}
                                    style={{ minWidth: 72 }}
                                />
                                <FlatButton
                                    id="card-delete"
                                    label="Delete"
                                    onTouchTap={handleTouchTap}
                                    primary={true}
                                    style={{ minWidth: 72 }}
                                />
                            </CardActions>
                        </Card>
                    ))}
                </MuiList>
                <FloatingActionButton
                    id="card-add"
                    onTouchTap={handleTouchTap}
                    secondary={true}
                    style={{ float: 'right' }}
                >
                    <FontIcon
                        className="material-icons"
                        style={{ fontSize: 32 }}
                    >
                        add
                    </FontIcon>
                </FloatingActionButton>
            </div>
        );
    }
}
