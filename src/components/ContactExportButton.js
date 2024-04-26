import React from "react";

const ContactExportButton = ({ exportContacts }) => {
  return (
    <button
      class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-1 rounded-lg"
      onClick={exportContacts}
    >
      Exportar contactos
    </button>
  );
};

export default ContactExportButton;
