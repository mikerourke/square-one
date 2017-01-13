import React, { Component, PropTypes } from 'react';
import GoogleMapLoader from 'react-google-maps-loader';
import GooglePlacesSuggest from 'react-google-places-suggest';
import TextField from 'material-ui/TextField';
import 'react-google-places-suggest/lib/index.css';

const API_KEY = 'AIzaSyAkiq1bkZask4elXgU_BnM7d6xzjGMXw0A';

class LocationSearchBox extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            search: '',
            selectedCoordinate: null
        };

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSelectSuggest = this.handleSelectSuggest.bind(this);
    }

    handleSearchChange(event) {
        this.setState({
            search: event.target.value
        })
    }

    handleSelectSuggest(suggest, coordinate) {
        this.setState({
            search: suggest.description,
            selectedCoordinate: coordinate
        })
    }

    render() {
        const { search } = this.state;
        const { googleMaps } = this.props;
        return (
            <GooglePlacesSuggest
                googleMaps={googleMaps}
                onSelectSuggest={this.handleSelectSuggest}
                search={search}>
                <TextField
                    ref="searchField"
                    style={{width: "100%"}}
                    value={search}
                    floatingLabelText="Address"
                    onChange={this.handleSearchChange}
                />
            </GooglePlacesSuggest>
        )
    }
}

export default GoogleMapLoader(LocationSearchBox, {
    libraries: ['places'],
    key: API_KEY
});
