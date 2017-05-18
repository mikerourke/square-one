/* @flow */

/* External dependencies */
import React, { Component } from 'react';
import phones from 'phones';
import isAlpha from 'validator/lib/isAlpha';
import isEmail from 'validator/lib/isEmail';
import normalizeEmail from 'validator/lib/normalizeEmail';
import TextField from 'material-ui/TextField';

/* Types */
type DataType = 'text' | 'number' | 'any';
type Format = 'phone' | 'email' | 'none';

type DefaultProps = {
  dataType: DataType,
  format: Format,
  isRequired: boolean,
  value: string | number,
};

type Props = {
  dataType?: 'text' | 'number' | 'any',
  format?: 'phone' | 'email' | 'none',
  isRequired?: boolean,
  name: string,
  onInputChange: (event: Event & { currentTarget: HTMLInputElement },
    newValue: string | number, fieldName: string) => void,
  value?: string | number,
};

type State = {
  errorText: string,
  value: string | number,
};

/**
 * Text field on forms with validation, requirement check, and format
 *    cleanup.
 * @param {string} dataType Indicates the type of data in the field.
 * @param {string} format Special formatting that needs to be applied to the
 *    field.
 * @param {boolean} [isRequired=false] Indicates if the field is required.
 * @param {string} name Name of the field.
 * @param {Function} onValidInputChange Action to perform after a valid input
 *    is entered into the field.
 * @param {string|number} value Initial value of the field.
 */
class FormTextField extends Component<DefaultProps, Props, State> {
  props: Props;
  state: State;

  static defaultProps = {
    dataType: 'any',
    format: 'none',
    isRequired: false,
    value: '',
  };

  constructor(props: Props): void {
    super(props);
    const { value } = this.props;
    let inputValue = '';
    if (value) {
      inputValue = value;
    }
    this.state = {
      errorText: '',
      value: inputValue,
    };
  }

  /**
   * If the value entered in the field doesn't fall within the requirements
   *    of the specified format, the error text indicating that the
   *    format is incorrect is displayed.
   * @param {string|number} newValue Value entered into the input.
   * @returns {string} Error text to display.
   */
  errorTextForFormat = (newValue: string | number): string => {
    const { format } = this.props;
    if (format === 'phone') {
      const parsedPhone = phones.parse(newValue);

      if (!phones.validate(parsedPhone)) {
        return 'Invalid phone number';
      }
    }
    if (format === 'email') {
      if (!isEmail(newValue)) {
        return 'Invalid email address';
      }
    }
    return '';
  };

  /**
   * If the value entered into the field was specified as text and a number
   *    is entered (or vice versa), this is the error text displayed for
   *    the field.
   * @param {string|number} newValue Value entered into the input.
   * @returns {string} Error text to display.
   */
  errorTextForDataType = (newValue: string | number): string => {
    const { dataType } = this.props;

    if (!newValue) {
      return '';
    }

    // If the specified dataType prop is "text", ensure the value only contains
    // uppercase and lowercase letters. If not, return error text.
    if (dataType === 'text') {
      if (typeof newValue === 'string') {
        let invalidCount = 0;
        newValue.split(' ').forEach((word) => {
          if (!isAlpha(word)) {
            if (!word.match(/[.,-]/g)) {
              invalidCount += 1;
            }
          }
        });
        if (invalidCount > 0) {
          return 'Field can only contain letters, commas, periods, or dashes';
        }
      } else {
        return 'Field cannot be a number';
      }
    }

    // If the value is supposed to be a number, but it isn't, return the error
    // text indicating it's an invalid value.
    if (dataType === 'number') {
      if (isNaN(newValue)) {
        return 'Field must be a number';
      }
    }

    return '';
  };

  /**
   * If the field is required and nothing was entered into the input, this
   *    is the error text to display in the field.
   * @param {string|number} newValue Value of the input.
   * @returns {string} Error text to display.
   */
  errorTextForRequiredField = (newValue: string | number): string => {
    const { isRequired } = this.props;
    if (newValue === '' && isRequired) {
      return 'Required';
    }

    return '';
  };

  /**
   * Returns the error for invalid entry by precendence.  If the field is
   *    required and nothing was entered, show that error message first.
   * @param {string|number} newValue Value of the input.
   * @returns {string} Error text to display.
   */
  errorTextByPrecedence = (newValue: string | number): string => {
    const requiredErrorText = this.errorTextForRequiredField(newValue);
    if (requiredErrorText) {
      return requiredErrorText;
    }

    if (!requiredErrorText && newValue === '') {
      return '';
    }

    const dataTypeErrorText = this.errorTextForDataType(newValue);
    if (dataTypeErrorText) {
      return dataTypeErrorText;
    }

    const formatErrorText = this.errorTextForFormat(newValue);
    if (formatErrorText) {
      return formatErrorText;
    }

    return '';
  };

  /**
   * Updates the value of the input and any applicable error messages in
   *    local state.
   * @param {Event} event Event associated with the input.
   * @param {string|number} newValue Value of the input.
   * @param {string} errorText Error text associated with the input (if any).
   */
  updateInput = (
    event: Event & { currentTarget: HTMLInputElement },
    newValue: string | number,
    errorText: string,
  ): void => {
    const { onInputChange } = this.props;
    onInputChange(event, newValue, errorText);
    this.setState({
      errorText,
      value: newValue,
    });
  };

  /**
   * Applies any special formatting to the specified value and returns the
   *    formatted value.
   * @param {string|number} newValue Value of the input.
   * @returns {string|number} Formatted value of the input.
   */
  formatValueAfterBlur = (newValue: string | number): string | number => {
    const { format } = this.props;
    if (format === 'phone') {
      if (phones.validate(newValue)) {
        return phones.format(newValue);
      }
    }
    if (format === 'email') {
      if (isEmail(newValue)) {
        return normalizeEmail(newValue);
      }
    }
    return newValue;
  };

  /**
   * Updates the input value and applicable error text in local state after
   *    the input loses focus.
   * @param {Event} event Event associated with the input.
   */
  handleBlur = (event: Event & { currentTarget: HTMLInputElement }): void => {
    const newValue = this.formatValueAfterBlur(event.currentTarget.value);
    const errorText = this.errorTextByPrecedence(newValue);
    this.updateInput(event, newValue, errorText);
  };

  /**
   * Updates the input value and applicable error text in local state after
   *    a change is made to the input value.
   * @param {Event} event Event associated with the input.
   * @param {string|number} newValue New value of the input.
   */
  handleChange = (
    event: Event & { currentTarget: HTMLInputElement },
    newValue: string | number,
  ): void => {
    this.setState({ value: newValue });
  };

  render(): React.Element<*> {
    const {
      dataType,
      format,
      isRequired,
      onInputChange,
      ...props
    } = this.props;

    const {
      errorText,
      value,
    } = this.state;

    return (
      <TextField
        {...props}
        errorText={errorText}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        value={value}
      />
    );
  }
}

export default FormTextField;
