declare module 'google-maps' {
    declare var exports: any;
}

declare type LatLngBoundsLiteral = {
    east: number,
    north: number,
    south: number,
    west: number,
}

declare type LatLngLiteral = {
    lat: number,
    lng: number,
}

declare class LatLngBounds {
    constructor(sw?: LatLng | LatLngLiteral, ne?: LatLng | LatLngLiteral),
    contains(latLng: LatLng | LatLngLiteral): boolean,
    equals(other: LatLngBounds | LatLngBoundsLiteral): boolean,
    extend(point: LatLng | LatLngLiteral): LatLngBounds,
    getCenter(): LatLng,
    getNorthEast(): LatLng,
    getSouthWest(): LatLng,
    intersects(other: LatLngBounds | LatLngBoundsLiteral),
    isEmpty(): boolean,
    toJSON(): LatLngBoundsLiteral,
    toSpan(): LatLng,
    toString(): string,
    toUrlValue(precision?: number): string,
    union(other: LatLngBounds | LatLngBoundsLiteral): LatLngBounds
}

declare class LatLng {
    constructor(lat: number, lng: number, noWrap?: boolean),
    equals(other: LatLng): boolean,
    lat(): number,
    lng(): number,
    toJSON(): LatLngLiteral,
    toString(): string,
    toUrlValue(precision?: number): string,
}

declare type MapsEventListener = {
    remove: () => void,
}

declare type MapOptions = {
    backgroundColor: string,
    center: LatLng,
    clickableIcons: boolean,
    disableDefaultUI: boolean,
    disableDoubleClickZoom: boolean,
    draggable: boolean,
    draggableCursor: string,
    draggingCursor: string,
    fullscreenControl: boolean,
    fullscreenControlOptions: any,
    gestureHandling: 'cooperative' | 'greedy' | 'none' | 'auto',
    heading: number,
    keyboardShortcuts: boolean,
    mapTypeControl: boolean,
    mapTypeControlOptions: any,
    mapTypeId: any,
    maxZoom: number,
    minZoom: number,
    noClear: boolean,
    panControl: boolean,
    panControlOptions: any,
    rotateControl: boolean,
    rotateControlOptions: any,
    scaleControl: boolean,
    scaleControlOptions: any,
    scrollwheel: boolean,
    streetView: any,
    streetViewControl: boolean,
    streetViewControlOptions: any,
    styles: any,
    tilt: number,
    zoom: number,
    zoomControl: boolean,
    zoomControlOptions: any,
}

declare class event {
    addDomListener(instance: Object, eventName: string, handler: Function,
                   capture?: boolean): MapsEventListener,
    addDomListenerOnce(instance: Object, eventName: string, handler: Function,
                       capture?: boolean): MapsEventListener,
    addListener(instance: Object, eventName: string,
                handler: Function): MapsEventListener
    addListenerOnce(instance: Object, eventName: string,
                    handler: Function): MapsEventListener,
    clearInstanceListeners(instance: Object): void,
    clearListeners(instance: Object, eventName: string): void,
    removeListener(listener: MapsEventListener): void,
    trigger(instance: Object, eventName: string, var_args: any): void,
}

declare class MVCObject {
    addListener(eventName: string, handler: Function): MapsEventListener,
    bindTo(key: string, target: Object, targetKey?: string,
           noNotify?: boolean): void,
    get(key: string): any,
    notify(key: string): void,
    set(key: string, value: any): void,
    setValues(values?: Object): void,
    unbind(key: string): void,
    unbindAll(): void,
}

declare class Point {
    constructor(x: number, y: number),
    equals(other: Point): boolean,
    toString(): string,
    x: number,
    y: number,
}

declare class GoogleMap extends MVCObject {
    constructor(mapDiv: HTMLElement, opts?: MapOptions),
    fitBounds(bounds: LatLngBounds | LatLngBoundsLiteral),
    getBounds(): LatLngBounds,
    getCenter(): LatLng,
    getClickableIcons(): boolean,
    getDiv(): HTMLElement,
    getHeading(): number,
    getMapTypeId(): any,
    getProjection(): any,
    getStreetView(): any,
    getTilt(): number,
    getZoom(): number,
    panBy(x: number, y: number): void,
    panTo(latLng: LatLng | LatLngLiteral): void,
    panToBounds(latLngBounds: LatLngBounds | LatLngBoundsLiteral): void,
    setCenter(latlng: LatLng | LatLngLiteral): void,
    setClickableIcons(value: boolean): void,
    setHeading(heading: number): void,
    setMapTypeId(mapTypeId: any): void,
    setOptions(options: MapOptions): void,
    setStreetView(panorama: any): void,
    setTilt(tilt: number): void,
    setZoom(zoom: number): void,
    controls: Array<any>
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

declare type AutocompleteOptions = {
    bounds: LatLngBounds | LatLngBoundsLiteral,
    componentRestrictions: any,
    placeIdOnly: boolean,
    strictBounds: boolean,
    types: Array<string>,
}

declare type PlaceGeometry = {
    location: LatLng,
    viewport: LatLngBounds,
};

declare type PlaceResult = {
    address_components: Array<any>,
    aspects: Array<any>,
    formatted_address: string,
    formatted_phone_number: string,
    geometry: PlaceGeometry,
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

declare class Autocomplete extends MVCObject {
    constructor(inputField: HTMLElement, opts?: AutocompleteOptions),
    getBounds(): LatLngBounds,
    getPlace(): PlaceResult,
    setBounds(bounds: LatLngBounds | LatLngBoundsLiteral),
    setComponentRestrictions(restrictions: any),
    setTypes(types:Array<string>),
    place_changed: () => void,
}

declare type MarkerLabel = {
    color: string,
    fontFamily: string,
    fontSize: string,
    fontWeight: string,
    text: string,
}

declare type MarkerPlace = {
    location: LatLng | LatLngLiteral,
    placeId: string,
    query: string,
}

declare type MarkerShape = {
    coords: Array<number>,
    type: 'circle' | 'poly' | 'rect',
}

declare type MarkerOptions = {
    anchorPoint: Point,
    animation: any,
    clickable: boolean,
    crossOnDrag: boolean,
    cursor: string,
    draggable: boolean,
    icon: string,
    label: string,
    map: GoogleMap,
    opacity: number,
    optimized: boolean,
    place: any,
    position: LatLng,
    shape: any,
    title: string,
    visible: boolean,
    zIndex: number,
}

declare class Marker extends MVCObject {
    constructor(opts?: MarkerOptions),
    getAnimation(): any,
    getClickable(): boolean,
    getCursor(): string,
    getDraggable(): boolean,
    getIcon(): string,
    getLabel(): MarkerLabel,
    getMap(): GoogleMap,
    getOpacity(): number,
    getPlace(): MarkerPlace,
    getPosition(): LatLng,
    getShape(): MarkerShape,
    getTitle(): string,
    getVisible(): boolean,
    getZIndex(): number,
    setAnimation(animation: any): void,
    setClickable(flag: boolean): void,
    setCursor(cursor: string): void,
    setDraggable(flag: boolean): void,
    setIcon(icon: string): void,
    setLabel(label: string | MarkerLabel): void,
    setMap(map: GoogleMap): void,
    setOpacity(opacity: number): void,
    setOptions(options: MarkerOptions): void,
    setPlace(place: MarkerPlace): void,
    setPosition(latlng: LatLng | LatLngLiteral): void,
    setShape(shape: MarkerShape): void,
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

declare class GoogleMaps {
    Map: Class<GoogleMap>,
    Marker: Class<Marker>,
    places: {
        Autocomplete: Class<Autocomplete>,
    },
}

declare var google: {
    maps: GoogleMaps
};
