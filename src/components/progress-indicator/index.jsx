/* @flow */

/* External dependencies */
import React from 'react';
import glamorous from 'glamorous';
import CircularProgress from 'material-ui/CircularProgress';

/* Internal dependencies */
import { primary1Color } from 'style/mui/palette';

const width = '100%';

const Container = glamorous.div({
  width,
  alignItems: 'center',
  display: 'flex',
  flexFlow: 'row wrap',
  height: 150,
  justifyContent: 'center',
  marginTop: 128,
});

const ProgressWrapper = glamorous.div({
  width,
  alignSelf: 'flex-end',
  flex: '1 0 100%',
  textAlign: 'center',
});

const LoadingLabel = glamorous.div({
  width,
  alignSelf: 'flex-start',
  color: primary1Color,
  fontSize: 14,
  flex: '0 0 100%',
  marginTop: 24,
  textAlign: 'center',
  textTransform: 'uppercase',
});

/**
 * Circular progress indicator that displays loading progress.
 */
const ProgressIndicator = (): React.Element<*> => (
  <Container>
    <ProgressWrapper>
      <CircularProgress
        thickness={8}
        size={96}
      />
    </ProgressWrapper>
    <LoadingLabel>
      Loading, please wait...
    </LoadingLabel>
  </Container>
);

export default ProgressIndicator;
