import { createSlice } from '@reduxjs/toolkit';
import { initialContacts } from 'data/contacts';
import { getId } from 'utils';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialContacts,

  reducers: {
    resetContacts: () => initialContacts,

    addContact: (state, { payload: newContact }) => {
      state.push({ ...newContact, id: getId() });
    },

    deleteContact: (state, { payload: contactId }) =>
      state.filter(({ id }) => id !== contactId),
  },
});

export const { resetContacts, addContact, deleteContact } =
  contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
