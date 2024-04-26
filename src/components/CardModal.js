import { useState } from "react";
import Modal from "react-modal";
import { AiTwotoneMail, AiFillPhone, AiFillMobile } from "react-icons/ai";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const CardModal = ({ contact }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const mapStyles = {
    height: "400px",
    width: "400px",
  };
  const googleMapsApiKey = "AIzaSyCdmKLc3GF7W-blwzOpaEcwgHnunoCG7ZU";
  return (
    <div>
      <a
        className="f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green"
        onClick={() => setModalOpen(true)}
        href="#0"
      >
        More info
      </a>
      <Modal
        className="ba br4 pa4 mw8 mt6 center bg-white"
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        ariaHideApp={false}
      >
        <h2 className="tc">
          {contact.name.title +
            " " +
            contact.name.first +
            " " +
            contact.name.last}
        </h2>
        <div className="dib mr5">
          <img alt="{contact.picture.large}" src={contact.picture.large} />
          <p>Gender: {contact.gender}</p>
          <p>
            City: {contact.location.city}, {contact.location.state}(
            {contact.location.country})
          </p>
          <p>
            Street: {contact.location.street.name},
            {contact.location.street.number}
          </p>
          <p>Zip Code: {contact.location.postcode}</p>
          <p>Timezone: {contact.location.timezone.offset}</p>
          <p>
            <AiTwotoneMail /> Email: {contact.email}
          </p>
          <p>
            <AiFillPhone /> Phone: {contact.phone}
          </p>
          <p>
            <AiFillMobile /> Cell: {contact.cell}
          </p>
        </div>
        <div className="dib">
          <LoadScript googleMapsApiKey={googleMapsApiKey}>
            <GoogleMap
              mapContainerStyle={mapStyles}
              center={{
                lat: parseFloat(contact.location.coordinates.latitude),
                lng: parseFloat(contact.location.coordinates.longitude),
              }}
              zoom={12}
            >
              <Marker
                position={{
                  lat: parseFloat(contact.location.coordinates.latitude),
                  lng: parseFloat(contact.location.coordinates.longitude),
                }}
              />
            </GoogleMap>
          </LoadScript>
        </div>
        <div className="tc">
          <a
            className="f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-blue"
            onClick={() => setModalOpen(false)}
            href="#0"
          >
            Close
          </a>
        </div>
      </Modal>
    </div>
  );
};

export default CardModal;
