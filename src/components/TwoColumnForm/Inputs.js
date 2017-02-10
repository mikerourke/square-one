import styled, { css } from 'styled-components';
import LocationField from '../LocationField';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';

const style = css`
    margin: 0 24px;
    width: 95% !important;
`;

const LocationInput = styled(LocationField)`${style}`;
const SelectInput = styled(SelectField)`${style}`;
const TextInput = styled(TextField)`${style}`;

export {
    LocationInput,
    SelectInput,
    TextInput,
};
