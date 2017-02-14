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
import TextField from 'material-ui/TextField';
import styled from 'styled-components';

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

        const { lat, lng } = props.initialCenter;
        this.state = {
            center: {
                lat,
                lng,
            },
            areElementsLoaded: false,
        };

        // Specify the div names for the map and autocomplete fields for
        // reference in the functions.
        this.MAP_ID = 'geo-map';
        this.AUTO_ID = 'geo-address';
    }

    componentDidMount() {
        this.initializeComponents();
    }

    /**
     * Load the Google Maps API object and create the Geolocation components
     *      on the form.
     */
    initializeComponents() {
        this.loadGoogleMaps()
            .then(this.createMap)
            .then(this.createMarker)
            .then(this.createAutocomplete)
            .then(() => {
                this.removeTabIndexesFromMap();
                this.autocomplete.bindTo('bounds', this.map);
                this.autocomplete.addListener('place_changed', () => {
                    this.onPlaceChanged();
                });
                this.setState({
                    areElementsLoaded: true,
                });
            })
    }

    /**
     * Async get the Google Maps API object with the corresponding libraries
     *      and API key.
     * @returns {Promise}
     */
    loadGoogleMaps() {
        return new Promise((resolve) => {
            GoogleMapsLoader.release();
            GoogleMapsLoader.KEY = 'AIzaSyAkiq1bkZask4elXgU_BnM7d6xzjGMXw0A';
            GoogleMapsLoader.LIBRARIES = ['places'];
            GoogleMapsLoader.load((google) => {
                this.google = google;
                resolve()
            });
        });
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
     * Prevents the focus from going to any of the links on the Map element
     *      when the user presses the tab key.
     */
    removeTabIndexesFromMap() {
        this.google.maps.event.addListener(this.map, 'tilesloaded', () => {
            const selector = `#${this.MAP_ID} a`;
            document.querySelectorAll(selector).forEach(element =>
                element.setAttribute('tabIndex', '999'),
            );
        });
    }

    /**
     * Creates the Map element and attaches it to the rendered div.
     * @returns {Promise}
     */
    createMap() {
        return new Promise((resolve) => {
            const element = document.getElementById(this.MAP_ID);
            const { center } = this.state;
            this.map = new this.google.maps.Map(element, {
                zoom: 4,
                center,
            });
            resolve();
        });
    }

    /**
     * Creates a new Marker element to represent the coordinates associated
     *      with an address.
     * @returns {Promise}
     */
    createMarker() {
        return new Promise((resolve) => {
            const { Marker, Point } = this.google.maps;
            this.marker = new Marker({
                map: this.map,
                anchorPoint: new Point(0, 0),
            });
            resolve();
        });
    }

    /**
     * Creates an Autocomplete field for addresses and attaches it to the
     *      rendered div.
     * @returns {Promise}
     */
    createAutocomplete() {
        return new Promise((resolve) => {
            const { Autocomplete } = this.google.maps.places;
            const element = document.getElementById(this.AUTO_ID);
            this.autocomplete = new Autocomplete(element);
            resolve();
        });
    }

    render() {
        const {
            initialCenter,
            ...props
        } = this.props;

        const MapWrapper = styled.div`
            height: 280px;
            width: 100% !important;
        `;

        return (
            <div>
                <TextField
                    id={this.AUTO_ID}
                    placeholder=""
                    {...props}
                />
                <MapWrapper
                    id={this.MAP_ID}
                />
            </div>
        );
    }
}

export default FormGeolocation;
