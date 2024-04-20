import React, { useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  Polyline,
} from "react-google-maps";
import InfoBox from "react-google-maps/lib/components/addons/InfoBox";

type mapProps = {
  addressLat: number;
  addressLng: number;
  addressText: string;
};

function Map({ addressLat, addressLng, addressText }: mapProps) {
  const options = { closeBoxURL: "", enableEventPropagation: true };

  const optionsPolyline = {
    strokeColor: "red",
    strokeOpacity: 0.8,
    strokeWeight: 3,
    fillColor: "#085daa",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1,
  };

  const positions = [
    {
      lat: 10.8651766,
      lng: 106.6163858,
      label: "Đại học Giao thông vận tải - cơ sở 3",
    },
  ];

  positions.push({
    lat: addressLat,
    lng: addressLng,
    label: addressText,
  });

  return (
    <div>
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 10.8651766, lng: 106.6163858 }}
      >
        {positions &&
          positions.map((position, index) => (
            <Marker
              key={index}
              position={new window.google.maps.LatLng(position)}
            >
              <InfoBox options={options}>
                <>
                  <div
                    style={{
                      backgroundColor: "green",
                      fontSize: "18px",
                      color: "white",
                      borderRadius: "16px",
                      padding: "2px",
                    }}
                  >
                    {position.label}
                  </div>
                </>
              </InfoBox>
            </Marker>
          ))}
        <Polyline path={positions} options={optionsPolyline} />
      </GoogleMap>
    </div>
  );
}

export default withScriptjs(withGoogleMap(Map));
