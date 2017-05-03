/* @flow */

/* External dependencies */
import React, { Component } from 'react';
import phones from 'phones';
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
    onValidInputChange: (event: Event & { currentTarget: HTMLInputElement },
        newValue: string | number, fieldName: string) => void,
    value?: string | number,
};

type State = {
    errorText: string,
    value: string | number,
};

/**
 * Text field on forms with validation, requirement check, and format
 *      cleanup.
 * @param {string} dataType Indicates the type of data in the field.
 * @param {string} format Special formatting that needs to be applied to the
 *      field.
 * @param {boolean} [isRequired=false] Indicates if the field is required.
 * @param {string} name Name of the field.
 * @param {Function} onValidInputChange Action to perform after a valid input
 *      is entered into the field.
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
        const { value = '' } = this.props;
        this.state = {
            errorText: '',
            value,
        };
    }

    /**
     * If the value entered in the field doesn't fall within the requirements
     *      of the specified format, the error text indicating that the
     *      format is incorrect is displayed.
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
        return '';
    };

    /**
     * If the value entered into the field was specified as text and a number
     *      is entered (or vice versa), this is the error text displayed for
     *      the field.
     * @param {string|number} newValue Value entered into the input.
     * @returns {string} Error text to display.
     */
    errorTextForDataType = (newValue: string | number): string => {
        const { dataType } = this.props;

        if (!newValue) {
            return '';
        }

        if (dataType === 'text') {
            if (typeof newValue === 'string') {
                const charArray = [...newValue];
                let numberOfChars = 0;
                charArray.forEach((char) => {
                    if (!isNaN(char) && char !== ' ') {
                        numberOfChars += 1;
                    }
                });
                if (numberOfChars > 0) {
                    return 'Field cannot contain a number';
                }
            } else {
                return 'Field cannot be a number';
            }
        }

        if (dataType === 'number') {
            if (isNaN(newValue)) {
                return 'Field must be a number';
            }
        }

        return '';
    };

    /**
     * If the field is required and nothing was entered into the input, this
     *      is the error text to display in the field.
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
     *      required and nothing was entered, show that error message first.
     * @param {string|number} newValue Value of the input.
     * @returns {string} Error text to display.
     */
    errorTextByPrecedence = (newValue: string | number): string => {
        const requiredErrorText = this.errorTextForRequiredField(newValue);
        if (requiredErrorText) {
            return requiredErrorText;
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
     *      local state.
     * @param {Event} event Event associated with the input.
     * @param {string|number} newValue Value of the input.
     * @param {string} errorText Error text associated with the input (if any).
     */
    updateInput = (
        event: Event & { currentTarget: HTMLInputElement },
        newValue: string | number,
        errorText: string,
    ): void => {
        const { name, onValidInputChange } = this.props;

        if (errorText === '') {
            onValidInputChange(event, newValue, name);
        }

        this.setState({
            errorText,
            value: newValue,
        });
    };

    // TODO: Comment and finalize phone validation/formatting.
    formatValueAfterBlur = (newValue: string | number): string | number => {
        const { format } = this.props;
        if (format === 'phone') {
            if (phones.validate(newValue)) {
                return phones.format(newValue);
            }
        }
        return newValue;
    };

    /**
     * Updates the input value and applicable error text in local state after
     *      the input loses focus.
     * @param {Event} event Event associated with the input.
     */
    handleBlur = (event: Event & { currentTarget: HTMLInputElement }): void => {
        const newValue = this.formatValueAfterBlur(event.currentTarget.value);
        const errorText = this.errorTextByPrecedence(newValue);
        this.updateInput(event, newValue, errorText);
    };

    /**
     * Updates the input value and applicable error text in local state after
     *      a change is made to the input value.
     * @param {Event} event Event associated with the input.
     * @param {string|number} newValue New value of the input.
     */
    handleChange = (
        event: Event & { currentTarget: HTMLInputElement },
        newValue: string | number,
    ): void => {
        const errorText = this.errorTextByPrecedence(newValue);
        this.updateInput(event, newValue, errorText);
    };

    render(): React.Element<*> {
        const {
            dataType,
            format,
            isRequired,
            onValidInputChange,
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
