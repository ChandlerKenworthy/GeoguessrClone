import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, StreetViewPanorama } from "@react-google-maps/api";
import "../App.css";

const getRandomCoordinates = () => {
    return {
      lat: (Math.random() * 180 - 90).toFixed(6),
      lng: (Math.random() * 360 - 180).toFixed(6)
    };
};

export default function GuessMap() {
    const [targetLocation, setTargetLocation] = useState(getRandomCoordinates());
    const [guess, setGuess] = useState(null);
    const [distance, setDistance] = useState(null);
  
    useEffect(() => {
      setTargetLocation(getRandomCoordinates());
    }, []);
  
    const handleMapClick = (event) => {
        const guessedLatLng = { lat: event.latLng.lat(), lng: event.latLng.lng() };
        setGuess(guessedLatLng);
  
        const distance = getDistance(targetLocation, guessedLatLng);
        setDistance(distance);
    };
  
    const getDistance = (loc1, loc2) => {
      const R = 6371; // radius of earth in km
      const dLat = ((loc2.lat - loc1.lat) * Math.PI) / 180;
      const dLng = ((loc2.lng - loc1.lng) * Math.PI) / 180;
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos((loc1.lat * Math.PI) / 180) * Math.cos((loc2.lat * Math.PI) / 180) *
                Math.sin(dLng / 2) * Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c; // [km]
    };

    const containerStyle = {
        height: "400px",
        width: "800px"
    };
    
    const center = {
        lat: 54.364442,
        lng: 18.643173
    };

    return (
        <div className="root">
            <h1>GeoGuessr Clone</h1>
            <p>{JSON.stringify(targetLocation)}</p>
            <p>{guess && JSON.stringify(guess)}</p>
            {distance && (<p>Distance = {distance.toFixed(2)} km</p>)}
            <div className="streetViewWrapper">
                <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
                    <StreetViewPanorama 
                        position={center}
                        visible={true}
                        options={{ disableDefaultUI: true }}
                    />
                </GoogleMap>
            </div>  
            <div className="mapContainer">
                <GoogleMap
                    center={{ lat: 0, lng: 0 }}
                    zoom={2}
                    mapContainerStyle={{ height: "400px", width: "100%" }}
                    onClick={handleMapClick}
                >
                    {guess && <Marker position={guess} />}
                </GoogleMap>
            </div>
        </div>
    );
}