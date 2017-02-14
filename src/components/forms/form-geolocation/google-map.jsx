/*
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

/**
 * Google map component located underneath the form input.
 */
class GoogleMap extends Component {
    static propTypes = {
        /**
         * Latitude and longitude to show on the map.
         */
        center: PropTypes.objectOf(PropTypes.number),
        /**
         * Name of the Google Map div on the page.
         */
        mapElementId: PropTypes.string.isRequired,
        /**
         * Google Maps API object.
         */
        google: PropTypes.object.isRequired,
        /**
         * Handler for the location change.
         */
        handleLocationChange: PropTypes.func.isRequired,
    };

    static defaultProps = {
        center: {
            lat: 0,
            lng: 0,
        },
    };

    constructor(props, context) {
        super(props, context);
        this.mapElementId = props.mapElementId;
    }

    componentDidMount() {
        this.createMap().then(() => this.removeTabIndexes());
    }

    /**
     * Create a new Google Map object and assign it to the element on the
     *      page.  The method returns a promise because the Google API is
     *      loaded async.
     * @returns {Promise}
     */
    createMap() {
        return new Promise((resolve) => {
            const { center, google } = this.props;
            const mapElement = document.getElementById(this.mapElementId);
            this.map = new google.maps.Map(mapElement, {
                zoom: 4,
                center,
            });
            resolve();
        });
    }

    /**
     * Prevents the links on the map from receiving focus if the user presses
     *      tab on the form.
     */
    removeTabIndexes() {
        const { google } = this.props;
        google.maps.event.addListener(this.map, 'tilesloaded', () => {
            const selector = `#${this.mapElementId} a`;
            document.querySelectorAll(selector).forEach(element =>
                element.setAttribute('tabIndex', '999'),
            );
        });
    }

    render() {
        const Wrapper = styled.div`
            height: 280px;
        `;

        return (
            <Wrapper id={this.mapElementId} />
        )
    }
}

export default GoogleMap;
