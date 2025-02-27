import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
  zIndex: 50,
};
const center = { lat: 37.7749, lng: -122.4194 }; // Default location

const LiveTracking = () => {
  //   console.log(import.meta.env.VITE_GOOGLE_MAP_KEY);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${import.meta.env.VITE_GOOGLE_MAP_KEY}`,
  });
  const [userLocation, setUserLocation] = useState(center);
  const [markerPosition, setMarkerPosition] = useState(center);

  useEffect(() => {
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => console.error(error),
          { enableHighAccuracy: true }
        );
      }
    };
    const locationInterval = setInterval(() => {
      updateLocation();
    }, 5000);
    updateLocation();
    return () => clearInterval(locationInterval);
  }, []);

  useEffect(() => {
    setMarkerPosition(userLocation);
  }, [userLocation]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={15}
      center={userLocation}
    >
      <Marker
        key={userLocation.lat + userLocation.lng} // Add a unique key
        position={markerPosition}
        label="U"
        // icon={{
        //   url: "https://maps.google.com/mapfiles/kml/shapes/man.png", // Add a custom icon
        //   scaledSize: new google.maps.Size(30, 30),
        // }}
      />
    </GoogleMap>
  );
};

export default LiveTracking;
