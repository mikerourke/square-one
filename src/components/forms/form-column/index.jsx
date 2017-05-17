/* @flow */

/* External dependencies */
import React from 'react';
import glamorous from 'glamorous';

/**
 * Column on a two-column form.
 */
const FormColumn = ({
  children,
}: {
  children?: React.Element<*>,
}): React.Element<*> => (
  <glamorous.Div
    flex="1 400px"
    margin="0 auto"
    padding="0 8px 0 8px"
    minWidth={0}
  >
    {children}
  </glamorous.Div>
);

export default FormColumn;
