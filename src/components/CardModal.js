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
        class="inline-block text-sm font-medium px-3 py-2 mb-2 rounded-md text-white bg-dark-green hover:scale-105"
        onClick={() => setModalOpen(true)}
        href="#0"
      >
        More info
      </a>
      <Modal
        class="border rounded-lg p-4 max-w-8xl mt-6 mx-auto bg-white"
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        ariaHideApp={false}
      >
        <h2 class="text-center">
          {contact.name.title +
            " " +
            contact.name.first +
            " " +
            contact.name.last}
        </h2>
        <div class="inline-block mr-5">
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
        <div class="inline-block">
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
        <div class="text-center">
          <a
            class="text-sm font-medium rounded-md px-3 py-2 mb-2 inline-block text-white bg-dark-blue"
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
