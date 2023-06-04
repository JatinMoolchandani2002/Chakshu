import "./styles.css";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "../Molecules/constants";
import { redpinicon, yellowpinicon } from "../Molecules/constants";
export default function Map() {


  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);

    const map = useMap();

    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      });
    }, [map]);

    return position === null ? null : (
      <>
      <Circle center={position} radius={1000} pathOptions={{color: '#FF726f' }}/>
      <Marker position={position} icon={icon}>
        <Popup>
          You are here. <br />
        </Popup>
      </Marker>
      <Marker position={[18.509577, 73.805812 ]} icon={redpinicon}>
        <Popup>
          You are here. <br />
        </Popup>
      </Marker>
      <Marker position={[18.512100, 73.806023]} icon={yellowpinicon}>
        <Popup>
          You are here. <br />
        </Popup>
      </Marker>
      </>
    );
  }

  return (
    <div className='min-h-[88vh] max-w-[49vw] w-full bg-gray-100 rounded-xl drop-shadow-xl'>
    <MapContainer
      center={[18.5204, 73.8567]}
      zoom={15}
      scrollWheelZoom
      style={{ height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
    </div>
  )
}