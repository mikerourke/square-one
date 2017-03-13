/* @flow */

/* External dependencies */
import React from 'react';
import TextField from 'material-ui/TextField';

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
    }

    static defaultProps = {
        dataType: 'any',
        format: 'none',
        isRequired: false,
        value: '',
    }

    constructor(props: any): void {
        super(props);
        const { value } = (this.props: Object);
        this.state = {
            errorText: '',
            value,
        };
    }

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

    errorTextForRequiredField = (newValue: any): string => {
        const { isRequired } = this.props;
        if (newValue === '' && isRequired) {
            return 'Required';
        }

        return '';
    };

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
    }

    cleanupValue = (oldValue: any) => {
        const charArray = [...oldValue];
        const newChars = charArray.filter(char => !isNaN(char));
        return newChars.join('');
    }

    updatedFormat = (newValue: any): string => {
        const { format } = this.props;
        if (format === 'phone') {
            if (newValue.match(/^\(\d{3}\) \d{3}-\d{4}/)) {
                return newValue;
            }
            const cleanValue = this.cleanupValue(newValue);
            const zipCode = cleanValue.substring(0, 3);
            const prefix = cleanValue.substring(3, 6);
            const suffix = cleanValue.substring(6, 10);
            const other = cleanValue.substring(10, cleanValue.length);
            const phoneNumber = `(${zipCode}) ${prefix}-${suffix} ${other}`;
            return phoneNumber.replace(/\s{2,}/g, ' ');
        }
    };

    updateInput = (event: Event, newValue: any, errorText: string) => {
        const { name, onValidInputChange } = this.props;

        if (errorText === '') {
            onValidInputChange(event, newValue, name);
        }

        this.setState({
            errorText,
            value: newValue,
        });
    }

    handleBlur = (event: Event) => {
        const { format } = this.props;
        const { errorText } = this.state;

        const target = event.target;
        if (target instanceof HTMLInputElement) {
            const newValue = target.value;

            let formattedValue = newValue;
            if (format !== 'none') {
                formattedValue = this.updatedFormat(newValue);
            }
            this.updateInput(event, formattedValue, errorText);
        }
    };

    handleChange = (event: Event, newValue: any): void => {
        const errorText = this.errorTextByPrecedence(newValue);
        this.updateInput(event, newValue, errorText);
    };

    render() {
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
