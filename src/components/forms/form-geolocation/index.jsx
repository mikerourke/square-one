/**
 * Some of this code was taken from the material-ui-geosuggest NPM package.
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
import GoogleMapsLoader from 'google-maps';
import styled from 'styled-components';
import TextField from 'material-ui/TextField';

const MapWrapper = styled.div`
    height: 352px;
`;

/**
 * Address input and Google Map component.
 */
class FormGeolocation extends Component {
    static propTypes = {
        /**
         * Name of the text field input.
         */
        name: PropTypes.string.isRequired,
        /**
         * Label to show about the text field input.
         */
        floatingLabelText: PropTypes.string.isRequired,
        /**
         * Value of the input (if existing).
         */
        value: PropTypes.string,
        /**
         * Event to fire when the contents of the input are changed.
         */
        onChange: PropTypes.func.isRequired,
        /**
         * Initial center point for the Google Map element.
         */
        initialCenter: PropTypes.objectOf(PropTypes.number),
    };

    static defaultProps = {
        value: '',
        initialCenter: {
            lat: 0,
            lng: 0,
        },
    };

    constructor(props, context) {
        super(props, context);
        this.initializeComponents = this.initializeComponents.bind(this);
        this.onPlaceChanged = this.onPlaceChanged.bind(this);
    }

    state = {
        center: {
            lat: this.props.initialCenter.lat,
            lng: this.props.initialCenter.lng,
        },
        areElementsLoaded: false,
    };

    componentDidMount() {
        this.initializeComponents();
    }

    /**
     * Handles when the Autocomplete field is updated.
     */
    onPlaceChanged() {
        const { autocomplete, map, marker } = this;
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
     * Load the Google Maps API object and create the Geolocation components
     *      on the form.
     */
    initializeComponents() {
        const { initialCenter } = this.props;
        this.loadGoogleMaps(initialCenter)
            .then(this.createMap)
            .then(this.createMarker)
            .then(this.createAutocomplete)
            .then((googleElements) => {
                const { google, autocomplete, map, marker } = googleElements;
                this.google = google;
                this.autocomplete = autocomplete;
                this.map = map;
                this.marker = marker;

                this.removeTabIndexesFromMap();
                this.autocomplete.bindTo('bounds', this.map);
                this.autocomplete.addListener('place_changed', () => {
                    this.onPlaceChanged();
                });
                this.setState({
                    areElementsLoaded: true,
                });
            });
    }

    /**
     * Async get the Google Maps API object with the corresponding libraries
     *      and API key.
     * @returns {Promise}
     */
    loadGoogleMaps(initialCenter) {
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
     * @returns {Promise}
     */
    createMap(googleElements) {
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
    removeTabIndexesFromMap() {
        this.google.maps.event.addListener(this.map, 'tilesloaded', () => {
            const selector = `#${'geo-map'} a`;
            document.querySelectorAll(selector).forEach(element =>
                element.setAttribute('tabIndex', '999'),
            );
        });
    }

    /**
     * Creates a new Marker element to represent the coordinates associated
     *      with an address.
     * @returns {Promise}
     */
    createMarker(googleElements) {
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
     * @returns {Promise}
     */
    createAutocomplete(googleElements) {
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
