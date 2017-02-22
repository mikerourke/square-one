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
    initialCenter: LatLngLiteral,
};

type State = {
    center: LatLngLiteral,
    areElementsLoaded: boolean,
}

type GoogleElements = {
    google: google,
    autocomplete: Autocomplete,
    initialCenter: LatLngLiteral,
    map: GoogleMap,
    marker: Marker,
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

    constructor(props: Props, context: any) {
        super(props, context);
        this.onPlaceChanged = this.onPlaceChanged.bind(this);
    }

    state: State = {
        center: {
            lat: this.props.initialCenter.lat,
            lng: this.props.initialCenter.lng,
        },
        areElementsLoaded: false,
    };

    /**
     * Initializes the Google Map components after mounting.
     */
    componentDidMount() {
        const { initialCenter } = this.props;
        this.loadGoogleMaps(initialCenter)
            .then(this.createMap)
            .then(this.createMarker)
            .then(this.createAutocomplete)
            .then((googleElements) => {
                const { google, autocomplete, map, marker } = googleElements;
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
        map: GoogleMap,
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
            center: {
                lat: location.lat,
                lng: location.lng,
            },
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
    loadGoogleMaps(initialCenter: LatLngLiteral) {
        return new Promise((resolve) => {
            GoogleMapsLoader.release();
            GoogleMapsLoader.KEY = 'AIzaSyAkiq1bkZask4elXgU_BnM7d6xzjGMXw0A';
            GoogleMapsLoader.LIBRARIES = ['places'];
            GoogleMapsLoader.load((google) => {
                const googleElements = { google, initialCenter };
                resolve(googleElements);
            });
        });
    }

    /**
     * Creates the Map element and attaches it to the rendered div.
     */
    createMap(googleElements: GoogleElements) {
        const { google, initialCenter } = googleElements;
        return new Promise((resolve) => {
            const element = document.getElementById('geo-map');
            const map = new google.maps.Map(element, {
                zoom: 4,
                center: initialCenter,
            });
            resolve({ ...googleElements, map });
        });
    }

    /**
     * Prevents the focus from going to any of the links on the Map element
     *      when the user presses the tab key.
     */
    removeTabIndexesFromMap(
        google: google,
        map: GoogleMap,
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
    createMarker(googleElements: GoogleElements) {
        const { google, map } = googleElements;
        return new Promise((resolve) => {
            const { Marker, Point } = google.maps;
            const marker = new Marker({
                map,
                anchorPoint: new Point(0, 0),
            });
            resolve({ ...googleElements, marker });
        });
    }

    /**
     * Creates an Autocomplete field for addresses and attaches it to the
     *      rendered div.
     */
    createAutocomplete(googleElements: GoogleElements) {
        const { google } = googleElements;
        return new Promise((resolve) => {
            const element = document.getElementById('geo-address');
            const autocomplete = new google.maps.places.Autocomplete(element);
            resolve({ ...googleElements, autocomplete });
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
