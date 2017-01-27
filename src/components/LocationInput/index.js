import config from 'config';
import React, { Component, PropTypes } from 'react';
import GoogleMapLoader from 'react-google-maps-loader';
import GooglePlacesSuggest from 'react-google-places-suggest';
import TextField from 'material-ui/TextField';
import 'react-google-places-suggest/lib/index.css';

const style = {
    textField: {
        width: '100%',
    },
};

// TODO: Add pre-population for this input (need coordinates?).

class LocationInput extends Component {
    static propTypes = {
        googleMaps: PropTypes.object.isRequired,
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            search: '',
            selectedCoordinate: null,
        };

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSelectSuggest = this.handleSelectSuggest.bind(this);
    }

    handleSearchChange(event) {
        this.setState({
            search: event.target.value,
        });
    }

    handleSelectSuggest(suggest, coordinate) {
        this.setState({
            search: suggest.description,
            selectedCoordinate: coordinate,
        });
    }

    render() {
        const { search } = this.state;
        const { googleMaps } = this.props;
        return (
            <GooglePlacesSuggest
                googleMaps={googleMaps}
                onSelectSuggest={this.handleSelectSuggest}
                search={search}
            >
                <TextField
                    style={style.textField}
                    value={search}
                    floatingLabelText="Address"
                    onChange={this.handleSearchChange}
                />
            </GooglePlacesSuggest>
        );
    }
}

export default GoogleMapLoader(LocationInput, {
    libraries: ['places'],
    key: config.googleMapsApiKey,
});
