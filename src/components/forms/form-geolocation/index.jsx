// @flow

/**
 * Some of this code was taken from the material-ui-geosuggest NPM package.
 *      Since the code was only 58 lines long, I copied it to avoid having
 *      an additional dependency.  I also added the asynchronous loader for
 *      the Google Maps API.  Here's the license and link information:
 * @author Copyright (c) 2015 Julian Ćwirko <julian.io>
 * @see https://github.com/Cemgoktugsorgun/material-ui-geosuggest/blob/master/src/index.js
 */

/* External dependencies */
import React, { Component, PropTypes } from 'react';
import GoogleMapsLoader from 'google-maps';
import styled from 'styled-components';
import TextField from 'material-ui/TextField';

import type {
    Autocomplete,
    LatLng,
    LatLngLiteral,
    Map,
    Marker,
    Google,
} from 'google-maps';

/**
 * Wrapper for the Google Map element.
 */
const MapWrapper = styled.div`
    height: 352px;
`;

type Props = {
    name: string,
    floatingLabelText: string,
    value?: string,
    onChange: () => void,
    initialCenter: LatLngLiteral | LatLng,
};

type State = {
    center: LatLngLiteral | LatLng,
    areElementsLoaded: boolean,
}

/**
 * Address input and Google Map component.
 */
class FormGeolocation extends React.Component {
    props: Props;

    static defaultProps = {
        value: '',
        initialCenter: {
            lat: 0,
            lng: 0,
        },
    };

    state: State = {
        center: this.props.initialCenter,
        areElementsLoaded: false,
    };

    /**
     * Initializes the Google Map components after mounting.
     */
    componentDidMount() {
        this.loadGoogleMaps(this.props.initialCenter)
            .then(this.createMap)
            .then(this.createMarker)
            .then(this.createAutocomplete)
            .then(({ google, autocomplete, initialCenter, map, marker }) => {
                this.removeTabIndexesFromMap(google, map);
                autocomplete.bindTo('bounds', map);
                autocomplete.addListener('place_changed', () => {
                    this.onPlaceChanged(autocomplete, map, marker);
                });
                this.setState({
                    areElementsLoaded: true,
                });
            });
    }

    /**
     * When the address is changed in the Autocomplete field, the map is
     *      updated and a marker is set to the new address.
     */
    onPlaceChanged(
        autocomplete: Autocomplete,
        map: Map,
        marker: Marker,
    ) {
        // Hide the marker prior to zooming on a different location.
        marker.setVisible(false);

        // Get the Place ID that corresponds with the address entered in the
        // Autocomplete field.
        const place = autocomplete.getPlace();

        // If the place doesn't have a corresponding latitude and longitude,
        // exit the function.
        if (!place.geometry) {
            return;
        }

        // If the place does have valid lat/lng, get the location details and
        // update the state.
        const { viewport, location } = place.geometry;
        this.setState({
            center: location,
        });

        const addressInput = document.getElementById('geo-address');
        addressInput.value = place.formatted_address;

        // If the place had a valid viewport, update the Map element to fit
        // the bounds.  If not, center the Map to the location coordinates
        // and update the zoom.
        if (viewport) {
            map.fitBounds(viewport);
        } else {
            map.setCenter(location);
            map.setZoom(5);
        }

        // Set the Marker on the address location and show.
        marker.setPosition(location);
        marker.setVisible(true);
    }

    /**
     * Async get the Google Maps API object with the corresponding libraries
     *      and API key.
     */
    loadGoogleMaps(initialCenter: LatLngLiteral | LatLng) {
        return new Promise((resolve) => {
            GoogleMapsLoader.release();
            GoogleMapsLoader.KEY = 'AIzaSyAkiq1bkZask4elXgU_BnM7d6xzjGMXw0A';
            GoogleMapsLoader.LIBRARIES = ['places'];
            GoogleMapsLoader.load((google) => {
                resolve({ google, initialCenter });
            });
        });
    }

    /**
     * Creates the Map element and attaches it to the rendered div.
     */
    createMap({
        google,
        initialCenter,
    }: {
        google: Google,
        initialCenter: LatLngLiteral,
    }) {
        return new Promise((resolve) => {
            const element = document.getElementById('geo-map');
            const map = new google.maps.Map(element, {
                zoom: 4,
                center: initialCenter,
            });
            resolve({ google, initialCenter, map });
        });
    }

    /**
     * Prevents the focus from going to any of the links on the Map element
     *      when the user presses the tab key.
     */
    removeTabIndexesFromMap(
        google: Google,
        map: Map,
    ) {
        google.maps.event.addListener(map, 'tilesloaded', () => {
            const selector = `#${'geo-map'} a`;
            document.querySelectorAll(selector).forEach(element =>
                element.setAttribute('tabIndex', '999'),
            );
        });
    }

    /**
     * Creates a new Marker element to represent the coordinates associated
     *      with an address.
     */
    createMarker({
        google,
        initialCenter,
        map,
    }: {
        google: Google,
        initialCenter: LatLngLiteral,
        map: Map,
    }) {
        return new Promise((resolve) => {
            const marker = new google.maps.Marker({
                map,
                anchorPoint: new google.maps.Point(0, 0),
            });
            resolve({ google, initialCenter, map, marker });
        });
    }

    /**
     * Creates an Autocomplete field for addresses and attaches it to the
     *      rendered div.
     */
    createAutocomplete({
        google,
        initialCenter,
        map,
    }: {
        google: Google,
        initialCenter: LatLngLiteral,
        map: Map,
    }) {
        return new Promise((resolve) => {
            const element = document.getElementById('geo-address');
            const autocomplete = new google.maps.places.Autocomplete(element);
            resolve({ google, initialCenter, map, autocomplete });
        });
    }

    render() {
        const {
            initialCenter,
            ...props
        } = this.props;

        return (
            <div>
                <TextField
                    {...props}
                    fullWidth={true}
                    id={'geo-address'}
                    placeholder=""
                />
                <MapWrapper
                    id={'geo-map'}
                />
            </div>
        );
    }
}

export default FormGeolocation;
