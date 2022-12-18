import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

import { Form, Label, Button } from './ContactForm.styled';

export function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const handleFormSubmit = e => {
    e.preventDefault();
    onSubmit({ name, number });

    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleInputChange = e => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'number':
        setNumber(e.target.value);
        break;
      default:
        return;
    }
  };

  return (
    <>
      <Form action="" onSubmit={handleFormSubmit}>
        <Label htmlFor={nameInputId}>
          Name
          <input
            onChange={handleInputChange}
            value={name}
            type="text"
            name="name"
            placeholder="Input name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </Label>

        <Label htmlFor={numberInputId}>
          Number
          <input
            onChange={handleInputChange}
            value={number}
            type="tel"
            name="number"
            placeholder="Input number xxx-xx-xx"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </Label>
        <Button type="submit">Add contact</Button>
      </Form>
    </>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};
