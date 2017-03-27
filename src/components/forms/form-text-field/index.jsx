/* @flow */

/* External dependencies */
import React from 'react';
import TextField from 'material-ui/TextField';

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
export default class FormTextField extends React.Component {
    props: {
        dataType?: 'text' | 'number' | 'any',
        format?: 'phone' | 'email' | 'none',
        isRequired?: boolean,
        name: string,
        onValidInputChange: (event: Event, newValue: string,
                             fieldName?: string) => void,
        value?: any,
    };

    state: {
        errorText: string,
        value: any,
    };

    static defaultProps = {
        dataType: 'any',
        format: 'none',
        isRequired: false,
        value: '',
    };

    constructor(props: any): void {
        super(props);
        const { value } = (this.props: Object);
        this.state = {
            errorText: '',
            value,
        };
    }

    /**
     * If the value entered into the field was specified as text and a number
     *      is entered (or vice versa), this is the error text displayed for
     *      the field.
     * @param {string|number} newValue Value entered into the input.
     * @returns {string} Error text to display.
     */
    errorTextForDataType = (newValue: any): string => {
        const { dataType } = this.props;

        if (!newValue) {
            return '';
        }

        if (dataType === 'text') {
            if (isNaN(newValue)) {
                const charArray = [...newValue];
                const numberChars = charArray.filter(
                    char => !isNaN(char) && char !== ' ');
                if (numberChars > 0) {
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
    errorTextForRequiredField = (newValue: any): string => {
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
    errorTextByPrecedence = (newValue: any): string => {
        const requiredErrorText = this.errorTextForRequiredField(newValue);
        if (requiredErrorText) {
            return requiredErrorText;
        }

        const dataTypeErrorText = this.errorTextForDataType(newValue);
        if (dataTypeErrorText) {
            return dataTypeErrorText;
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
    updateInput = (event: Event, newValue: any, errorText: string) => {
        const { name, onValidInputChange } = this.props;

        if (errorText === '') {
            onValidInputChange(event, newValue, name);
        }

        this.setState({
            errorText,
            value: newValue,
        });
    };

    /**
     * Updates the input value and applicable error text in local state after
     *      the input loses focus.
     * @param {Event} event Event associated with the input.
     */
    handleBlur = (event: Event) => {
        const { errorText } = this.state;

        const target = event.target;
        if (target instanceof HTMLInputElement) {
            const newValue = target.value;
            this.updateInput(event, newValue, errorText);
        }
    };

    /**
     * Updates the input value and applicable error text in local state after
     *      a change is made to the input value.
     * @param {Event} event Event associated with the input.
     * @param {string|number} newValue New value of the input.
     */
    handleChange = (event: Event, newValue: any): void => {
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
