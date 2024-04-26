import { useState, useEffect } from "react";
import CardList from "./components/CardList";
import Scroll from "./components/Scroll";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback";
import Searcher from "./components/Searcher";
import {Toast} from '@capacitor/toast'

function App() {
  Toast.show({text: 'Hello!'});
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=20")
      .then((response) => response.json())
      .then((contacts) => setContacts(contacts.results));
  }, []);

  const [searchField, setSearchField] = useState("");
  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  };
  const searchedContacts = contacts.filter((contact) => {
    return (contact.name["first"] + " " + contact.name["last"])
      .toLowerCase()
      .includes(searchField.toLowerCase());
  });

  const onAZ = () => {
    let az = contacts.sort((a, b) => {
      return (a.name["first"] + " " + a.name["last"]).localeCompare(
        b.name["first"] + " " + b.name["last"]
      );
    });
    setContacts([...az]); //clone the list
  };
  const onZA = () => {
    let za = contacts.sort((a, b) => {
      return (b.name["first"] + " " + b.name["last"]).localeCompare(
        a.name["first"] + " " + a.name["last"]
      );
    });
    setContacts([...za]); //clone the list
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Searcher searchChange={onSearchChange} az={onAZ} za={onZA} />
      <Scroll>
        <CardList contacts={searchedContacts} />
      </Scroll>
    </ErrorBoundary>
  );
}

export default App;
