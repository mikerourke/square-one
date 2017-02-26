/* @flow */

/**
 * Class representing a Google Map element.
 * @external google.maps.Map
 * @see #Map
 */
declare class google$Map extends google$MVCObject {
    constructor(mapDiv: any, opts?: google$MapOptions): void,
    fitBounds(bounds: google$LatLngBounds | google$LatLngBoundsLiteral): void,
    getBounds(): google$LatLngBounds,
    getCenter(): google$LatLng,
    getClickableIcons(): boolean,
    getDiv(): any,
    getHeading(): number,
    getMapTypeId(): string | google$MapTypeId,
    getProjection(): any,
    getStreetView(): any,
    getTilt(): number,
    getZoom(): number,
    panBy(x: number, y: number): void,
    panTo(latLng: google$LatLng | google$LatLngLiteral): void,
    panToBounds(latLngBounds: google$LatLngBounds |
                google$LatLngBoundsLiteral): void,
    setCenter(latlng: google$LatLng | google$LatLngLiteral): void,
    setClickableIcons(value: boolean): void,
    setHeading(heading: number): void,
    setMapTypeId(mapTypeId: any): void,
    setOptions(options: google$MapOptions): void,
    setStreetView(panorama: any): void,
    setTilt(tilt: number): void,
    setZoom(zoom: number): void,
    controls: Array<any>,
    data: any,
    mapTypes: any,
    overlayMapTypes: Array<any>,
    bounds_changed: () => void,
    center_changed: () => void,
    click: (event: MouseEvent) => void,
    dblclick: (event: MouseEvent) => void,
    drag: () => void,
    dragend: () => void,
    dragstart: () => void,
    heading_changed: () => void,
    idle: () => void,
    maptypeid_changed: () => void,
    mousemove: (event: MouseEvent) => void,
    mouseout: (event: MouseEvent) => void,
    mouseover: (event: MouseEvent) => void,
    projection_changed: () => void,
    resize: () => void,
    rightclick: (event: MouseEvent) => void,
    tilesloaded: () => void,
    tilt_changed: () => void,
    zoom_changed: () => void,
}

/**
 * Options for Google Map element.
 * @external google.maps.MapOptions
 * @see #MapOptions
 */
declare type google$MapOptions = {
    backgroundColor?: string,
    center?: google$LatLng,
    clickableIcons?: boolean,
    disableDefaultUI?: boolean,
    disableDoubleClickZoom?: boolean,
    draggable?: boolean,
    draggableCursor?: string,
    draggingCursor?: string,
    fullscreenControl?: boolean,
    fullscreenControlOptions?: any,
    gestureHandling?: 'cooperative' | 'greedy' | 'none' | 'auto',
    heading?: number,
    keyboardShortcuts?: boolean,
    mapTypeControl?: boolean,
    mapTypeControlOptions?: any,
    mapTypeId?: any,
    maxZoom?: number,
    minZoom?: number,
    noClear?: boolean,
    panControl?: boolean,
    panControlOptions?: any,
    rotateControl?: boolean,
    rotateControlOptions?: any,
    scaleControl?: boolean,
    scaleControlOptions?: any,
    scrollwheel?: boolean,
    streetView?: any,
    streetViewControl?: boolean,
    streetViewControlOptions?: any,
    styles?: any,
    tilt?: number,
    zoom?: number,
    zoomControl?: boolean,
    zoomControlOptions?: any,
}

/**
 * Identifiers for common MapTypes. Specify these by value, or by using
 * the constant's name.
 * @example
 * const type = 'satellite';
 * const type = google.maps.MapTypeId.SATELLITE;
 * @external google.maps.MapTypeId
 * @see #MapTypeId
 */
declare type google$MapTypeId = 'HYBRID' | 'ROADMAP' | 'SATELLITE' | 'TERRAIN';

/**
 * Google Marker element.
 * @external google.maps.Marker
 * @see #Marker
 */
declare class google$Marker extends google$MVCObject {
    constructor(opts?: google$MarkerOptions): void,
    getAnimation(): any,
    getClickable(): boolean,
    getCursor(): string,
    getDraggable(): boolean,
    getIcon(): string,
    getLabel(): google$MarkerLabel,
    getMap(): google$Map,
    getOpacity(): number,
    getPlace(): google$MarkerPlace,
    getPosition(): google$LatLng,
    getShape(): google$MarkerShape,
    getTitle(): string,
    getVisible(): boolean,
    getZIndex(): number,
    setAnimation(animation: any): void,
    setClickable(flag: boolean): void,
    setCursor(cursor: string): void,
    setDraggable(flag: boolean): void,
    setIcon(icon: string): void,
    setLabel(label: string | google$MarkerLabel): void,
    setMap(map: google$Map): void,
    setOpacity(opacity: number): void,
    setOptions(options: google$MarkerOptions): void,
    setPlace(place: google$MarkerPlace): void,
    setPosition(latlng: google$LatLng | google$LatLngLiteral): void,
    setShape(shape: google$MarkerShape): void,
    setTitle(title: string): void,
    setVisible(visible: boolean): void,
    setZIndex(zIndex: number): void,
    MAX_ZINDEX: number,
    animation_changed: () => void,
    click: (event: MouseEvent) => void,
    clickable_changed: () => void,
    cursor_changed: () => void,
    dblclick: (event: MouseEvent) => void,
    drag: (event: MouseEvent) => void,
    dragend: (event: MouseEvent) => void,
    draggable_changed: () => void,
    dragstart: (event: MouseEvent) => void,
    flat_changed: () => void,
    heading_changed: () => void,
    icon_changed: () => void,
    mousedown: (event: MouseEvent) => void,
    mouseout: (event: MouseEvent) => void,
    mouseover: (event: MouseEvent) => void,
    mouseup: (event: MouseEvent) => void,
    position_changed: () => void,
    rightclick: (event: MouseEvent) => void,
    shape_changed: () => void,
    title_changed: () => void,
    visible_changed: () => void,
    zindex_changed: () => void,
}

/**
 * Options for Marker element.
 * @external google.maps.MarkerOptions
 * @see #MarkerOptions
 */
declare type google$MarkerOptions = {
    anchorPoint?: google$Point,
    animation?: any,
    clickable?: boolean,
    crossOnDrag?: boolean,
    cursor?: string,
    draggable?: boolean,
    icon?: string,
    label?: string,
    map?: google$Map,
    opacity?: number,
    optimized?: boolean,
    place?: any,
    position?: google$LatLng,
    shape?: any,
    title?: string,
    visible?: boolean,
    zIndex?: number,
}

/**
 * Specify appearance of a marker label.
 * @external google.maps.MarkerLabel
 * @see #MarkerLabel
 */
declare type google$MarkerLabel = {
    color: string,
    fontFamily: string,
    fontSize: string,
    fontWeight: string,
    text: string,
}

/**
 * Defines the clickable region of a marker image for browsers other than
 *      Internet Explorer.
 * @external google.maps.MarkerShape
 * @see #MarkerShape
 */
declare type google$MarkerShape = {
    coords: Array<number>,
    type: 'circle' | 'poly' | 'rect',
}

/**
 * Google MarkerPlace element.
 * @external google.maps.MarkerPlace
 * @see #MarkerPlace
 */
declare type google$MarkerPlace = {
    location: google$LatLng | google$LatLngLiteral,
    placeId: string,
    query: string,
}

/**
 * An event listener, created by google.maps.event.addListener() and
 *      friends.
 * @external google.maps.MapsEventListener
 * @see #MapsEventListener
 */
declare type google$MapsEventListener = {
    remove: () => void,
}

/**
 * Namespace for handling events.
 * @external google.maps.event
 * @see #event
 */
declare class google$event {
    addDomListener(instance: Object, eventName: string, handler: Function,
                   capture?: boolean): google$MapsEventListener,
    addDomListenerOnce(instance: Object, eventName: string,
                       handler: Function,
                       capture?: boolean): google$MapsEventListener,
    addListener(instance: Object, eventName: string,
                handler: Function): google$MapsEventListener,
    addListenerOnce(instance: Object, eventName: string,
                    handler: Function): google$MapsEventListener,
    clearInstanceListeners(instance: Object): void,
    clearListeners(instance: Object, eventName: string): void,
    removeListener(listener: google$MapsEventListener): void,
    trigger(instance: Object, eventName: string, var_args: any): void,
}

/**
 * Point in geographical coordinates: latitude and longitude.
 * @external google.maps.LatLng
 * @see #LatLng
 */
declare class google$LatLng {
    constructor(lat: number, lng: number, noWrap?: boolean): void,
    equals(other: google$LatLng): boolean,
    lat(): number,
    lng(): number,
    toJSON(): google$LatLngLiteral,
    toString(): string,
    toUrlValue(precision?: number): string,
}

/**
 * Object literals accepted in place of LatLng objects.
 * @external google.maps.LatLngLiteral
 * @see #LatLngLiteral
 */
declare type google$LatLngLiteral = {
    lat: number,
    lng: number,
}

/**
 * Represents a rectangle in geographical coordinates.
 * @external google.maps.LatLngBounds
 * @see #LatLngBounds
 */
declare class google$LatLngBounds {
    constructor(sw?: google$LatLng | google$LatLngLiteral,
                ne?: google$LatLng | google$LatLngLiteral): void,
    contains(latLng: google$LatLng | google$LatLngLiteral): boolean,
    equals(other: google$LatLngBounds | google$LatLngBoundsLiteral): boolean,
    extend(point: google$LatLng | google$LatLngLiteral): google$LatLngBounds,
    getCenter(): google$LatLng,
    getNorthEast(): google$LatLng,
    getSouthWest(): google$LatLng,
    intersects(other: google$LatLngBounds | google$LatLngBoundsLiteral): void,
    isEmpty(): boolean,
    toJSON(): google$LatLngBoundsLiteral,
    toSpan(): google$LatLng,
    toString(): string,
    toUrlValue(precision?: number): string,
    union(other: google$LatLngBounds |
        google$LatLngBoundsLiteral): google$LatLngBounds
}

/**
 * Object literals accepted in place of LatLngBounds objects.
 * @external google.maps.LatLngBoundsLiteral
 * @see #LatLngBoundsLiteral
 */
declare type google$LatLngBoundsLiteral = {
    east: number,
    north: number,
    south: number,
    west: number,
}

/**
 * Geographical point.
 * @external google.maps.Point
 * @see #Point
 */
declare class google$Point {
    constructor(x: number, y: number): void,
    equals(other: google$Point): boolean,
    toString(): string,
    x: number,
    y: number,
}

/**
 * Base class implementing KVO.
 * @external google.maps.MVCObject
 * @see #MVCObject
 */
declare class google$MVCObject {
    addListener(eventName: string, handler: Function): google$MapsEventListener,
    bindTo(key: string, target: Object, targetKey?: string,
           noNotify?: boolean): void,
    get(key: string): any,
    notify(key: string): void,
    set(key: string, value: any): void,
    setValues(values?: Object): void,
    unbind(key: string): void,
    unbindAll(): void,
}

/**
 * A service to provide Place predictions based on text input.
 * @external google.maps.places.Autocomplete
 * @see #Autocomplete
 */
declare class google$Autocomplete extends google$MVCObject {
    constructor(inputField: any,
                opts?: google$AutocompleteOptions): void,
    getBounds(): google$LatLngBounds,
    getPlace(): google$PlaceResult,
    setBounds(bounds: google$LatLngBounds | google$LatLngBoundsLiteral): void,
    setComponentRestrictions(restrictions: any): void,
    setTypes(types: Array<string>): void,
    place_changed: () => void,
}

/**
 * The options that can be set on an Autocomplete object.
 * @external google.maps.places.AutocompleteOptions
 * @see #AutocompleteOptions
 */
declare type google$AutocompleteOptions = {
    bounds: google$LatLngBounds | google$LatLngBoundsLiteral,
    componentRestrictions: any,
    placeIdOnly: boolean,
    strictBounds: boolean,
    types: Array<string>,
}

/**
 * Defines information about the geometry of a Place.
 * @external google.maps.places.PlaceGeometry
 * @see #PlaceGeometry
 */
declare type google$PlaceGeometry = {
    location: google$LatLng,
    viewport: google$LatLngBounds,
};

/**
 * Defines information about a Place.
 * @external google.maps.places.PlaceResult
 * @see #PlaceResult
 */
declare type google$PlaceResult = {
    address_components: Array<any>,
    aspects: Array<any>,
    formatted_address: string,
    formatted_phone_number: string,
    geometry: google$PlaceGeometry,
    html_attributions: Array<string>,
    icon: string,
    international_phone_number: string,
    name: string,
    permanently_closed: boolean,
    photos: Array<any>,
    price_level: number,
    rating: number,
    reviews: Array<any>,
    types: Array<string>,
    url: string,
    utc_offset: number,
    vicinity: string,
    website: string,
}

/**
 * Class used to reference Google Maps API.
 */
declare class google$Maps {
    event: google$event,
    LatLng: Class<google$LatLng>,
    Map: Class<google$Map>,
    Marker: Class<google$Marker>,
    Point: Class<google$Point>,
    places: {
        Autocomplete: Class<google$Autocomplete>,
    },
}

declare module 'google-maps' {
    declare export type Autocomplete = google$Autocomplete;
    declare export type Google = {
        maps: google$Maps
    };
    declare export type LatLng = google$LatLng;
    declare export type LatLngLiteral = google$LatLngLiteral;
    declare export type Map = google$Map;
    declare export type MapOptions = google$MapOptions;
    declare export type Marker = google$Marker;

    declare var exports: {
        load: (google: Object) => any,
        release: () => void;
        KEY: string,
        LIBRARIES: Array<string>,
    }
}
