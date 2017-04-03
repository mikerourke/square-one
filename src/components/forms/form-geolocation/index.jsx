/* @flow */

/**
 * Some of this code was taken from the material-ui-geosuggest NPM package.
 *      Since the code was only 58 lines long, I copied it to avoid having
 *      an additional dependency.  I also added the asynchronous loader for
 *      the Google Maps API.  Here's the license and link information:
 * @author Copyright (c) 2015 Julian Ćwirko <julian.io>
 * @see https://github.com/Cemgoktugsorgun/material-ui-geosuggest/blob/master/src/index.js
 */

/* External dependencies */
import React, { Component } from 'react';
import GoogleMapsLoader from 'google-maps';
import styled from 'styled-components';
import TextField from 'material-ui/TextField';

/* Types */
import type { MapLocation } from 'lib/types';
import type {
    Autocomplete,
    Google,
    LatLng,
    Map,
    MapOptions,
    Marker,
} from 'google-maps';

type DefaultProps = {
    startingLocation: MapLocation,
}

type Props = {
    floatingLabelText: string,
    handleLocationChange: (newLocation: MapLocation) => void,
    startingLocation: MapLocation,
};

type State = {
    address: string,
    lat: number,
    lng: number,
};

/**
 * Wrapper for the Google Map element.
 */
const MapWrapper = styled.div`
    height: 352px;
`;

/**
 * Address input and Google Map component.
 * @param {string} floatingLabelText Text to display on the input.
 * @param {Function} handleLocationChange Action to perform when the location
 *      is changed.
 * @param {MapLocation} startingLocation Initial location to show.
 */
class FormGeolocation extends Component<DefaultProps, Props, State> {
    props: Props;
    state: State;
    autocomplete: Autocomplete;
    google: Google;
    map: Map;
    marker: Marker;

    static defaultProps = {
        startingLocation: {
            address: '',
            lat: 0,
            lng: 0,
        },
    };

    constructor(props: Props): void {
        super(props);
        const { address, lat, lng } = this.props.startingLocation;
        this.state = {
            address,
            lat,
            lng,
        };
    }

    /**
     * Initializes the Google Map components after mounting.
     */
    componentDidMount(): void {
        this.loadGoogleMaps().then((google) => {
            this.google = google;

            // Create a LatLng class instance for Flow type checking.
            const { lat, lng } = this.props.startingLocation;
            const center = new this.google.maps.LatLng(lat, lng);

            this.createMap(center);
            this.createMarker(center);
            this.createAutocomplete();
            this.autocomplete.addListener('place_changed', () => {
                this.onPlaceChanged();
            });
            this.removeTabIndexesFromMap();
        });
    }

    /**
     * When the address is changed in the Autocomplete field, the map is
     *      updated and a marker is set to the new address.
     */
    onPlaceChanged(): void {
        // Hide the marker prior to zooming on a different location.
        this.marker.setVisible(false);

        // Get the Place ID that corresponds with the address entered in the
        // Autocomplete field.
        const place = this.autocomplete.getPlace();

        // If the place doesn't have a corresponding latitude and longitude,
        // exit the function.
        if (!place.geometry) {
            return;
        }

        // If the place does have valid lat/lng, get the location details and
        // update the state.
        const { location } = place.geometry;

        // Focus on the specified location.
        this.map.setCenter(location);
        this.map.setZoom(16);

        // Set the Marker on the address location and show.
        this.marker.setPosition(location);
        this.marker.setVisible(true);

        // Update the parent Lead entity.
        const address = place.formatted_address;
        this.props.handleLocationChange({
            address,
            lat: location.lat(),
            lng: location.lng(),
        });

        // Ensure the Location input is updated and the location is shown
        // on the map.
        this.setState({ address });
    }

    /**
     * Async get the Google Maps API object with the corresponding libraries
     *      and API key.
     */
    loadGoogleMaps(): Promise<*> {
        return new Promise((resolve) => {
            GoogleMapsLoader.release();
            GoogleMapsLoader.KEY = 'AIzaSyAkiq1bkZask4elXgU_BnM7d6xzjGMXw0A';
            GoogleMapsLoader.LIBRARIES = ['places'];
            GoogleMapsLoader.load((google) => {
                resolve(google);
            });
        });
    }

    /**
     * Creates the Map element and attaches it to the rendered div.
     */
    createMap(center: LatLng): void {
        const element = document.getElementById('geo-map');
        const options: MapOptions = {
            center,
            zoom: 16,
        };
        this.map = new this.google.maps.Map(element, options);
    }

    /**
     * Prevents the focus from going to any of the links on the Map element
     *      when the user presses the tab key.
     */
    removeTabIndexesFromMap(): void {
        this.google.maps.event.addListener(this.map, 'tilesloaded', () => {
            const selector = `#${'geo-map'} a`;
            document.querySelectorAll(selector).forEach(element =>
                element.setAttribute('tabIndex', '999'),
            );
        });
    }

    /**
     * Creates an Autocomplete field for addresses and attaches it to the
     *      rendered div.
     */
    createAutocomplete(): void {
        const element = document.getElementById('geo-address');
        this.autocomplete = new this.google.maps.places.Autocomplete(element);
    }

    /**
     * Creates a new Marker element to represent the coordinates associated
     *      with an address.
     */
    createMarker(center: LatLng): void {
        this.marker = new this.google.maps.Marker({
            anchorPoint: new this.google.maps.Point(0, 0),
            map: this.map,
            position: center,
        });
    }

    handleChange = (event: Event, newValue: string = ''): void => {
        this.setState({ address: newValue });
    };

    render(): React.Element<*> {
        const {
            handleLocationChange,
            startingLocation,
            ...props
        } = this.props;

        const { address } = this.state;

        return (
            <div>
                <TextField
                    {...props}
                    fullWidth={true}
                    id="geo-address"
                    onChange={this.handleChange}
                    placeholder=""
                    value={address}
                />
                <MapWrapper id="geo-map" />
            </div>
        );
    }
}

export default FormGeolocation;
