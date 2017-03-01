/* @flow */

/* External dependencies */
import React from 'react';
import { List } from 'material-ui/List';
import {
    Card,
    CardText,
    CardTitle,
} from 'material-ui/Card';

/* Internal dependencies */
import { getSearchResults, getSortedData } from 'lib/query-actions';
import SearchToolbar from 'components/search-toolbar';

/* Types */
import type { Map } from 'immutable';

/**
 * List of card components.
 * @param {Array} cardContents Array of data objects to display on card.
 * @param {Array} [searchFieldExclusions=[]] Fields within the Card contents
 *      array that should be excluded from searches.
 */
export default class CardList extends React.Component {
    props: {
        cardContents: Map<number, any>,
        searchFieldExclusions?: Array<string>,
    };

    state: {
        cardContents: Map<number, any>,
    };

    static defaultProps = {
        searchFieldExclusions: [],
    };

    constructor(props: any): void {
        super(props);
        this.state = { cardContents: this.props.cardContents };
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
        const { cardContents } = this.state;
        return (
            <div>
                <SearchToolbar
                    handleSearchBoxChange={this.handleSearchBoxChange}
                    isStandalone={false}
                />
                <List
                    style={{
                        alignItems: 'stretch',
                        display: 'flex',
                        flexFlow: 'row wrap',
                        justifyContent: 'flex-start',
                    }}
                >
                    {cardContents.toList().map(cardEntity => (
                        <Card
                            key={cardEntity.id}
                            style={{
                                height: 150,
                                flex: '1 0 auto',
                                margin: 16,
                                minWidth: 300,
                                width: '30%',
                            }}
                        >
                            <CardTitle
                                subtitle={cardEntity.subtitle}
                                title={cardEntity.title}
                            />
                            <CardText>
                                {cardEntity.details}
                            </CardText>
                        </Card>
                    ))}
                </List>
            </div>
        );
    }
}
