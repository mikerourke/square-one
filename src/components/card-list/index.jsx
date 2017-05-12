/* @flow */

/* External dependencies */
import React, { Component } from 'react';
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
  handleDeleteTouchTap?: (cardEntity: CardEntity) => void,
  handleEditTouchTap?: (cardEntity: CardEntity) => void,
  hasActions: boolean,
  multipleCardsPerRow: boolean,
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
 *    is pressed.
 * @param {Function} [handleDeleteTouchTap] Action to perform when the Delete
 *    button is pressed.
 * @param {Function} [handleEditTouchTap] Action to perform when the Edit button
 *    is pressed.
 * @param {boolean} hasActions Indicates if the card has actions that can
 *    be performed.
 * @param {boolean} multipleCardsPerRow Indicates if multiple cards can be on
 *    a row or if each card should be on it's own row.
 * @param {Array} searchFieldInclusions Fields within the Card contents
 *    array that should be included in searches.
 * @param {boolean} showAddButton Indicates if the Add button should be shown.
 */
class CardList extends Component<*, Props, State> {
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
   *    specified value entered in the Search box.
   * @param {Event} event Event object associated with Search box.
   * @param {string} newValue Value to search by.
   */
  handleSearchBoxChange = (
    event: Event,
    newValue: string,
  ): void => {
    const { cardEntities, searchFieldInclusions } = this.props;
    const results = getSearchResults(
      cardEntities,
      newValue,
      searchFieldInclusions,
    );
    this.setState({ cardEntities: results });
  };

  getStyles = (): Object => {
    const { multipleCardsPerRow } = this.props;

    let cardStyle = { margin: '0 8px 24px 8px' };
    let listStyle = {};

    if (multipleCardsPerRow) {
      cardStyle = {
        flex: '1 0 auto',
        margin: 8,
        minWidth: 300,
        width: '40%',
      };

      listStyle = {
        alignItems: 'flex-start',
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'flex-start',
      };
    }

    return {
      card: cardStyle,
      list: listStyle,
    };
  };

  getCardActions = (cardEntity: CardEntity): React.Element<*> => {
    const {
      handleDeleteTouchTap = () => {},
      handleEditTouchTap = () => {},
    } = this.props;

    const buttonStyle = { minWidth: 72 };

    return (
      <CardActions>
        <FlatButton
          label="Edit"
          onTouchTap={() => handleEditTouchTap(cardEntity)}
          style={buttonStyle}
        />
        <FlatButton
          label="Delete"
          onTouchTap={() => handleDeleteTouchTap(cardEntity)}
          style={buttonStyle}
        />
      </CardActions>
    );
  };

  render(): React.Element<*> {
    const {
      handleAddTouchTap,
      hasActions,
      showAddButton,
    } = this.props;
    const { cardEntities } = this.state;
    const styles = this.getStyles();

    return (
      <div>
        <SearchToolbar
          handleSearchBoxChange={this.handleSearchBoxChange}
          isStandalone={false}
        />
        <MuiList
          style={styles.list}
        >
          {cardEntities.map(cardEntity => (
            <Card
              key={cardEntity.id}
              style={styles.card}
            >
              <CardHeader
                subtitle={cardEntity.subtitle}
                title={cardEntity.title}
              />
              <CardText>
                {cardEntity.contents}
              </CardText>
              {hasActions && this.getCardActions(cardEntity)}
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
