import {
  GoogleMap,
  DirectionsRenderer,
  useLoadScript,
} from "@react-google-maps/api";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../utility/axios";

const mapContainerStyle = { width: "100%", height: "100%" };

const RouteMap = ({ pickup, drop }) => {
  console.log({ pickup });
  console.log({ drop });
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${import.meta.env.VITE_GOOGLE_MAP_KEY}`,
  });
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    // const pickupCoords = async () => {
    //   try {
    //     const res = await axiosInstance.get(
    //       `/map/getCoordinates?address=${pickup}`
    //     );
    //     if (res.status === 200) {
    //       console.log("res pickup:", res);
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // const dropCoords = async () => {
    //   try {
    //     const res = await axiosInstance.get(
    //       `/map/getCoordinates?address=${drop}`
    //     );
    //     if (res.status === 200) {
    //       console.log("res pickup:", res);
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // pickupCoords();
    // dropCoords();
    if (pickup && drop) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: pickup,
          destination: drop,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result);
          }
        }
      );
    }
  }, [pickup, drop]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={15} center={pickup}>
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
};

export default RouteMap;
