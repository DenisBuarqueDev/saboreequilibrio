import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const GoogleMapComponent = () => {
  const center = {
    lat: -9.64985, // Latitude de Maceió, por exemplo
    lng: -35.70895,
  };

  return (
    <div>
      <LoadScript googleMapsApiKey="AIzaSyAdBNT1XuKy3OeS_E9lb14lBeoReXqaHlY" className="w-96 h-96">
        <GoogleMap center={center} zoom={14}>
          <Marker position={center} className="w-96 h-96" />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default GoogleMapComponent;
