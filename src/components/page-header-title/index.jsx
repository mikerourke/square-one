/* @flow */

/* External dependencies */
import React, { Component } from 'react';
import glamorous from 'glamorous';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

/* Internal dependencies */
import { alternateTextColor } from 'style/mui/palette';

/* Types */
type DefaultProps = {
  backArrowTooltip: string,
  handleBackArrowTouchTap: () => void,
  subheaderText: string
};

type Props = {
  headerText: string,
  titleIconName: string,
  backArrowTooltip?: string,
  handleBackArrowTouchTap?: () => void,
  subheaderText?: string,
};

const iconColor: string = alternateTextColor;

/**
 * Title component in the page header.
 * @param {string} headerText Text to display in the top row of the text next
 *    to the Title Icon.
 * @param {string} titleIconName Name of the Material Icon to display in the
 *    title.
 * @param {string} [backArrowTooltip=""] Tooltip to display when the Back arrow
 *    is hovered.
 * @param {Function} [handleBackArrowTouchTap] Action to perform when the Back
 *    arrow is pressed.
 * @param {string} [subheaderText=""] Text to display in the bottom row of the
 *    text next to the Title Icon.
 */
class PageHeaderTitle extends Component<DefaultProps, Props, *> {
  props: Props;

  static defaultProps = {
    backArrowTooltip: '',
    handleBackArrowTouchTap: () => {},
    subheaderText: '',
  };

  render(): React.Element<*> {
    const {
      headerText,
      titleIconName,
      backArrowTooltip,
      handleBackArrowTouchTap,
      subheaderText,
    } = this.props;

    const backArrowElement: React.Element<*> = (
      <IconButton
        iconClassName="material-icons"
        iconStyle={{ color: iconColor }}
        onTouchTap={handleBackArrowTouchTap}
        tooltip={backArrowTooltip}
        touch={true}
      >
        arrow_back
      </IconButton>
    );

    const { div } = glamorous;
    const rowStyle = { alignSelf: 'center', color: iconColor };
    const Header = div({ ...rowStyle, flex: '1 0 100%', fontSize: 18 });
    const Subheader = div({ ...rowStyle, flex: '0 0 100%', fontSize: 14 });

    return (
      <glamorous.Div display="flex">
        {backArrowTooltip && backArrowElement}
        <FontIcon
          className="material-icons"
          style={{
            color: iconColor,
            fontSize: 56,
            marginRight: 8,
          }}
        >
          {titleIconName}
        </FontIcon>
        <glamorous.Div
          display="flex"
          flexFlow="row wrap"
        >
          <Header>{headerText}</Header>
          <Subheader>{subheaderText}</Subheader>
        </glamorous.Div>
      </glamorous.Div>
    );
  }
}

export default PageHeaderTitle;
