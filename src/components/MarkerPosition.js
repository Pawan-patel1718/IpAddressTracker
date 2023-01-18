import React, { useEffect } from 'react'
import { Marker, Popup, useMap } from 'react-leaflet'
import icon from '../icon'

export default function MarkerPosition({ address }) {

    const position = [address.location.lat, address.location.lng]
    const map = useMap();
    useEffect(() => {
        map.flyTo(position, 13, {
            animation: true
        })
    }, [map, position])

    return (
        <>
            <Marker icon={icon} position={position}>
                <Popup>
                    Happy Hacking!
                </Popup>
            </Marker>
        </>
    )
}
