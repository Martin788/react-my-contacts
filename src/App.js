import { useState, useEffect } from "react";
import CardList from "./components/CardList";
import Scroll from "./components/Scroll";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback";
import {Toast} from '@capacitor/toast';
import SearchInput from 'react-search-input';
import Fuse from 'fuse.js';
import Filters from './components/Filters';

function App() {
  Toast.show({text: 'Hello!'});
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchField, setSearchField] = useState('name.first');

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
      ignoreLocation: true
    });

    const results = fuse.search(searchTerm);
    setFilteredContacts(results.map(result => result.item));
  };

  const handleSort = (order) => {
    const sortedContacts = [...filteredContacts].sort((a, b) => {
      if (order === 'asc') {
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
    handleSearch('');
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div>
        <SearchInput className="search-input" onChange={handleSearch} />
        <Filters handleSort={handleSort} handleFieldChange={handleFieldChange} />
      </div>
      <Scroll>
        <CardList contacts={filteredContacts} />
      </Scroll>
    </ErrorBoundary>
  );
}

export default App;
