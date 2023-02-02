import React from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '780px',
    height: '590px'
};

const center = {
    lng: 76.717873,
    lat: 30.704649
};

type props = {
    state: any
}

function GoogleMaps({ state }: props) {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyC54754SNl-NJU4WV6c7t4LNc_pQXKxYto"
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
            {state?.map((e: any, index: any) => {
                return (
                    <>
                        {<Marker key={index} position={{
                            lng: parseFloat(e?.attributes?.geolocation.lng),
                            lat: parseFloat(e?.attributes?.geolocation.lat)
                        }}
                            title={e.attributes.title}
                        />}
                    </>
                )
            }
            )}

        </GoogleMap>
    ) : <></>
}

export default React.memo(GoogleMaps)



