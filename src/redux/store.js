import { configureStore, createReducer, createAction } from '@reduxjs/toolkit';
import { initialContacts } from 'data/contacts';
import { getId } from 'utils';

export const addContact = createAction('contacts/add');
export const deleteContact = createAction('contacts/delete');
export const setContacts = createAction('contacts/set');
export const setFilter = createAction('filter/set');

const filterReducer = createReducer('', {
  [setFilter]: (state, { payload: newValue }) => newValue,
});

const contactsReducer = createReducer(initialContacts, {
  [setContacts]: (state, { payload: newData }) => newData,

  // immer -> можно state.concat({...})
  [addContact]: (state, { payload: newContact }) => [
    ...state,
    { ...newContact, id: getId() },
  ],

  [deleteContact]: (state, { payload: id }) =>
    state.filter(itm => itm.id !== id),
});

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: filterReducer,
  },
});
