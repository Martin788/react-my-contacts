import { useState, useEffect } from "react";
import CardList from "./components/CardList";
import Scroll from "./components/Scroll";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback";
import { Toast } from "@capacitor/toast";
import SearchInput from "react-search-input";
import Fuse from "fuse.js";
import Filters from "./components/Filters";
import ContactExportButton from "./components/ContactExportButton";

function App() {
  Toast.show({ text: "Hello!" });
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchField, setSearchField] = useState("name.first");

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=20")
      .then((response) => response.json())
      .then((contacts) => {
        setContacts(contacts.results);
        setFilteredContacts(contacts.results);
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
      });
  }, []);

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredContacts(contacts);
      return;
    }

    const fuse = new Fuse(contacts, {
      keys: [searchField],
      tokenize: true,
      matchAllTokens: true,
      threshold: 0,
      ignoreLocation: true,
    });

    const results = fuse.search(searchTerm);
    setFilteredContacts(results.map((result) => result.item));
  };

  const handleSort = (order) => {
    const sortedContacts = [...filteredContacts].sort((a, b) => {
      if (order === "asc") {
        return (a.name["first"] + " " + a.name["last"]).localeCompare(
          b.name["first"] + " " + b.name["last"]
        );
      } else {
        return (b.name["first"] + " " + b.name["last"]).localeCompare(
          a.name["first"] + " " + a.name["last"]
        );
      }
    });

    setFilteredContacts(sortedContacts);
  };

  const handleFieldChange = (field) => {
    setSearchField(field);
    handleSearch("");
  };

  const exportContactsToJson = () => {
    const contactsCopy = filteredContacts.map((contact) => ({ ...contact }));
    const json = JSON.stringify(contactsCopy, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contacts.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div class="md:flex md:items-center md:space-x-2">
          <SearchInput
            class="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
            onChange={handleSearch}
          />
          <Filters
            class="flex items-center space-x-3 mb-3 md:mb-0"
            handleSort={handleSort}
            handleFieldChange={handleFieldChange}
          />
        </div>
        <ContactExportButton
          class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
          exportContacts={exportContactsToJson}
        />
      </div>

      <Scroll>
        <CardList contacts={filteredContacts} />
      </Scroll>
    </ErrorBoundary>
  );
}

export default App;
