import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Contact.css";

const ContactUs = () => {
  const position = [40.7109, -74.0076]; // Coordinates for 113 Fulton Street, New York

  return (
    <div className="container">
      <div className="map-container">
        <MapContainer
          center={position}
          zoom={14}
          scrollWheelZoom={false}
          className="map"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>113 Fulton Street, Suite 721, New York</Popup>
          </Marker>
        </MapContainer>
      </div>
      <div className="form-container">
        <h2 className="heading">Get In Touch With Us</h2>
        <form className="form">
          <input type="text" placeholder="FULL NAME" className="input" />
          <div className="row">
            <input
              type="text"
              placeholder="FIRST NAME"
              className="half-input"
            />
            <input type="email" placeholder="E-MAIL" className="half-input" />
          </div>
          <textarea placeholder="YOUR MESSAGE" className="textarea"></textarea>
          <button type="submit" className="button">
            SEND
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
