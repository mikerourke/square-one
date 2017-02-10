/**
 * Most of this code was taken from the material-ui-geosuggest NPM package.
 *      Since the code was only 58 lines long, I copied it to avoid having
 *      an additional dependency.  I also added the asynchronous loader for
 *      the Google Maps API.  Here's the license and link information:
 * @author Copyright (c) 2015 Julian Ćwirko <julian.io>
 * @see https://github.com/Cemgoktugsorgun/material-ui-geosuggest/blob/master/src/index.js
 */
import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import GoogleMapsLoader from 'google-maps';

class LocationInput extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.string,
        hintText: PropTypes.string,
        style: PropTypes.object,
        handleChange: PropTypes.func.isRequired,
        onPlaceChange: PropTypes.func,
    };

    static defaultProps = {
        value: '',
        hintText: '',
        style: {
            width: '95%',
        },
        onPlaceChange: () => {},
    };

    constructor(props) {
        super(props);

        this.onPlaceChange = props.onPlaceChange;
    }

    componentDidMount() {
        GoogleMapsLoader.release();
        GoogleMapsLoader.KEY = 'AIzaSyAkiq1bkZask4elXgU_BnM7d6xzjGMXw0A';
        GoogleMapsLoader.LIBRARIES = ['places'];
        GoogleMapsLoader.load((google) => {
            const target = document.getElementsByName(this.props.name)[0];
            this.autocompleter = new google.maps.places.Autocomplete(target);

            this.autocompleter.addListener('place_changed', () => {
                this.onPlaceChange(this.autocompleter.getPlace());
            });
        });
    }

    render() {
        const {
            name,
            label,
            value,
            hintText,
            style,
            handleChange,
            onPlaceChange,
        } = this.props;

        if (onPlaceChange !== this.onPlaceChange) {
            this.onPlaceChange = onPlaceChange;
        }

        return (
            <TextField
                name={name}
                floatingLabelText={label}
                value={value}
                hintText={hintText}
                style={style}
                onChange={handleChange}
            />
        );
    }
}

export default LocationInput;
