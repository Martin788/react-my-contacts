import { useState, useEffect } from "react";
import CardList from "./components/CardList";
import Scroll from "./components/Scroll";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback";
import {Toast} from '@capacitor/toast';
import SearchInput from 'react-search-input';
import Fuse from 'fuse.js';

function App() {
  Toast.show({text: 'Hello!'});
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);

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
      setFilteredContacts(contacts); // Si no hay término de búsqueda, muestra todos los contactos
      return;
    }

    const fuse = new Fuse(contacts, {
      keys: ['name.first'],
      tokenize: true,
      matchAllTokens: true,
      threshold: 0.3
    });

    const results = fuse.search(searchTerm);
    setFilteredContacts(results.map(result => result.item));
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <SearchInput className="search-input" onChange={handleSearch} />
      <Scroll>
        <CardList contacts={filteredContacts} />
      </Scroll>
    </ErrorBoundary>
  );
}

export default App;
