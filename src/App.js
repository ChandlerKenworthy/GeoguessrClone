import React from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import GuessMap from "./components/GuessMap";
import { GOOGLE_MAPS_API_KEY } from "./keys";

export default function App() {
  const { isLoaded } = useJsApiLoader({ 
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ["maps"],
  });


  if(!isLoaded) return <div><h2>Loading...</h2></div>;

  return (
    <GuessMap />
  );
}