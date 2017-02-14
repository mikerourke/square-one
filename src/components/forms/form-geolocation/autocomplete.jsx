/**
 * Most of this code was taken from the material-ui-geosuggest NPM package.
 *      Since the code was only 58 lines long, I copied it to avoid having
 *      an additional dependency.  I also added the asynchronous loader for
 *      the Google Maps API.  Here's the license and link information:
 * @author Copyright (c) 2015 Julian Ćwirko <julian.io>
 * @see https://github.com/Cemgoktugsorgun/material-ui-geosuggest/blob/master/src/index.js
 */

/*
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';

// TODO: Finish splitting this.

class Autocomplete extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        floatingLabelText: PropTypes.string.isRequired,
        value: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        onPlaceChange: PropTypes.func,
        initialCenter: PropTypes.objectOf(PropTypes.number),
        google: PropTypes.object.isRequired,
        mapElementId: PropTypes.string.isRequired,
    };

    static defaultProps = {
        value: '',
        onPlaceChange: () => {},
        initialCenter: {
            lat: 0,
            lng: 0,
        },
    };

    createAutocomplete() {
        return new Promise((resolve) => {
            const { google, mapElementId } = this.props;
            const inputElement = document.getElementById('geo-address');
            const mapElement = document.getElementById(mapElementId);
            this.autocomplete = new google.maps.places.Autocomplete(inputElement);
            autocomplete.bindTo('bounds', mapElement);
            resolve();
        });
    }

    bindToMap() {
        this.autocomplete.bindTo('bounds', mapElement)
    }
}
