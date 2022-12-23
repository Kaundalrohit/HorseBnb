import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';



function GoogleMaps() {
    const [loc, setLoc] = useState({
        lng: 0 as number,
        lat: 0 as number
    })
    const containerStyle = {
        width: '780px',
        height: '750px'
    };

    const center = {
        lng: loc.lng,
        lat: loc.lat
    };

    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.watchPosition(function (position) {
                    console.log("Latitude is :", position.coords.latitude);
                    console.log("Longitude is :", position.coords.longitude);
                    setLoc({
                        ...loc,
                        lng: position.coords.longitude,
                        lat: position.coords.latitude,
                    })
                });
            }
        }
        getLocation()
    }, [])

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyC5tw9VHYCoB2RoZUhSN9ZdhPLojnhMsiY"
    })

    const [map, setMap] = React.useState(null)
    const onLoad = React.useCallback(function callback(map: any) {

        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map: any) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={3}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <></>
        </GoogleMap>
    ) : <></>
}

export default React.memo(GoogleMaps)





