import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './ContactsFilter/Filter';

import { Box } from './App.styled';

export function App({ initialContacts }) {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  console.log(contacts);

  const addNewContact = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name: name.trim(),
      number: number.trim(),
    };

    const contactCheck = contacts.find(contact => {
      return contact.name === newContact.name;
    });

    contactCheck
      ? alert(`${name} is already in the contacts`)
      : setContacts([newContact, ...contacts]);
  };

  const handleInputChange = e => {
    setFilter(e.target.value);
  };

  const filterContactByName = () => {
    const normalizedFilter = filter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = idContact => {
    // const arrayContactsNoDelete = contacts.filter(
    //   contact => contact.id !== idContact
    // );
    // setContacts(arrayContactsNoDelete);
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== idContact)
    );
  };

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts === null) {
      // setContacts(initialContacts);
      // setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // useEffect(() => {
  //   const storageContacts = localStorage.getItem('contacts');
  //   // if (storageContacts !== null) {
  //   const parsedContacts = JSON.parse(storageContacts);
  //   setContacts(parsedContacts);
  //   // }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('contacts', JSON.stringify(contacts));
  // }, [contacts]);

  return (
    <>
      <Box>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addNewContact} />

        <h2>Contacts</h2>
        <div>
          <Filter filterValue={filter} inputChange={handleInputChange} />
          <ContactList
            contactsByRender={filterContactByName()}
            onDeleteContact={deleteContact}
          />
        </div>
      </Box>
    </>
  );
}
