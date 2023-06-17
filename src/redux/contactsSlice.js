import { createSlice } from '@reduxjs/toolkit';
import { initialContacts } from 'data/contacts';
import { getId } from 'utils';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialContacts,

  reducers: {
    reset: () => initialContacts,

    add: (contacts, { payload: newContact }) => {
      contacts.push({ ...newContact, id: getId() });
    },

    remove: (contacts, { payload: contactId }) =>
      contacts.filter(({ id }) => id !== contactId),
  },
});

export const getContacts = ({ contacts }) => contacts;
export const { reset, add, remove } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
