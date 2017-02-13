/**
 * Most of this code was taken from the material-ui-geosuggest NPM package.
 *      Since the code was only 58 lines long, I copied it to avoid having
 *      an additional dependency.  I also added the asynchronous loader for
 *      the Google Maps API.  Here's the license and link information:
 * @author Copyright (c) 2015 Julian Ćwirko <julian.io>
 * @see https://github.com/Cemgoktugsorgun/material-ui-geosuggest/blob/master/src/index.js
 */

/* eslint-disable no-undef */

// TODO: Split this component up and add Google Maps API key to Torus.

import React, { Component, PropTypes } from 'react';
import GoogleMapsLoader from 'google-maps';
import TextField from 'material-ui/TextField';
import styled from 'styled-components';

const GoogleMap = styled.div`
    height: 280px;
`;

class GeoLocationField extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        floatingLabelText: PropTypes.string.isRequired,
        value: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        onPlaceChange: PropTypes.func,
        initialCenter: PropTypes.objectOf(PropTypes.number),
    };

    static defaultProps = {
        value: '',
        onPlaceChange: () => {},
        initialCenter: {
            lat: 0,
            lng: 0,
        },
    };

    constructor(props) {
        super(props);

        const { lat, lng } = props.initialCenter;
        this.state = {
            center: {
                lat,
                lng,
            },
        };

        this.onPlaceChange = props.onPlaceChange;
    }

    componentDidMount() {
        GoogleMapsLoader.release();
        GoogleMapsLoader.KEY = 'AIzaSyAkiq1bkZask4elXgU_BnM7d6xzjGMXw0A';
        GoogleMapsLoader.LIBRARIES = ['places'];
        GoogleMapsLoader.load((google) => {
            this.createMap(google)
                .then(this.createMarker)
                .then(this.createAutocomplete)
                .then((googleElements) => {
                    const { map, marker, autocomplete } = googleElements;
                    this.map = map;
                    this.marker = marker;
                    this.autocomplete = autocomplete;
                    this.autocomplete.addListener('place_changed', () => {
                        this.onPlaceChanged();
                    });
                    this.removeTabIndexes(google);
                });
        });
    }

    onPlaceChanged() {
        const { autocomplete, map, marker } = this;
        marker.setVisible(false);

        const place = autocomplete.getPlace();

        if (!place.geometry) {
            return;
        }
        const { viewport, location } = place.geometry;

        this.setState({
            center: {
                lat: location.lat,
                lng: location.lng,
            },
        });

        if (viewport) {
            map.fitBounds(viewport);
        } else {
            map.setCenter(location);
            map.setZoom(5);
        }

        marker.setPosition(location);
        marker.setVisible(true);
    }

    removeTabIndexes(google) {
        google.maps.event.addListener(this.map, 'tilesloaded', () => {
            document.querySelectorAll('#geo-map a').forEach(item =>
                item.setAttribute('tabIndex', '999'),
            );
        });
    }

    createMap(google) {
        return new Promise((resolve, reject) => {
            const mapElement = document.getElementById('geo-map');
            const { lat, lng } = this.state.center;
            const map = new google.maps.Map(mapElement, {
                zoom: 4,
                center: {
                    lat,
                    lng,
                },
            });
            resolve({ google, map });
        });
    }

    createMarker(googleElements) {
        return new Promise((resolve, reject) => {
            const { google, map } = googleElements;
            const marker = new google.maps.Marker({
                map,
                anchorPoint: new google.maps.Point(0, 0),
            });
            resolve({ ...googleElements, marker });
        });
    }

    createAutocomplete(googleElements) {
        return new Promise((resolve, reject) => {
            const { google, map } = googleElements;
            const input = document.getElementById('geo-address');
            const autocomplete = new google.maps.places.Autocomplete(input);
            autocomplete.bindTo('bounds', map);
            resolve({ ...googleElements, autocomplete });
        });
    }

    render() {
        const {
            initialCenter,
            onPlaceChange,
            ...props
        } = this.props;

        if (onPlaceChange !== this.onPlaceChange) {
            this.onPlaceChange = onPlaceChange;
        }

        return (
            <div>
                <TextField
                    id="geo-address"
                    placeholder=""
                    {...props}
                />
                <GoogleMap
                    id="geo-map"
                />
            </div>
        );
    }
}

export default GeoLocationField;
