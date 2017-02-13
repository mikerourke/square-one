import styled, { css } from 'styled-components';
import GeoLocationField from '../GeoLocationField';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';

const style = css`
    width: 100% !important;
`;

const LocationInput = styled(GeoLocationField)`${style}`;
const SelectInput = styled(SelectField)`${style}`;
const TextInput = styled(TextField)`${style}`;

export {
    LocationInput,
    SelectInput,
    TextInput,
};
