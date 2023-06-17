import { ToastContainer, toast } from 'react-toastify';
import { Container } from './App.styled';
import { Block } from 'styles/shared';
import { formatNumber } from 'utils';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { ContactEditor } from 'components/ContactEditor';
import { ContactList } from 'components/ContactList';
import { Filter } from 'components/Filter';
import { Header } from 'components/Header';
import { resetContacts, addContact, deleteContact } from 'redux/contactsSlice';
import { setFilter } from 'redux/filterSlice';

//
// Options
//

// const LS_KEY_CONTACTS = 'contacts';

const message = {
  ALREADY_EXISTS: `The contact with the same name or number already exists`,
  ACTION_NOT_SUPPORTED: 'Action not supported',
  ADDED_SUCCESS: `The contact was added successfully`,
};

//
// App
//

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(({ contacts }) => contacts);
  const filter = useSelector(({ filter }) => filter);

  const isContactExists = ({ name, number }) =>
    contacts.find(
      itm =>
        itm.name.toLocaleLowerCase() === name.toLocaleLowerCase() ||
        itm.number === number
    );

  const filterContacts = () => {
    const searchStr = filter.toLocaleLowerCase();

    return searchStr
      ? contacts.filter(
          ({ name, number }) =>
            name.toLocaleLowerCase().includes(searchStr) ||
            number.includes(searchStr)
        )
      : contacts;
  };

  // вернет true - форма очистится
  const handleEditorSubmit = ({ name, number }) => {
    const data = { name, number: formatNumber(number) };

    if (!isContactExists(data)) {
      dispatch(addContact(data));
      toast.success(message.ADDED_SUCCESS);
      return true;
    }

    toast.error(message.ALREADY_EXISTS);
  };

  const handleControlClick = (id, controlName) => {
    switch (controlName) {
      case 'delete':
        return dispatch(deleteContact(id));
      case 'edit':
        return toast.warn(message.ACTION_NOT_SUPPORTED);
      default:
    }
  };

  const filtered = filterContacts();

  return (
    <Container>
      <Header onResetClick={() => dispatch(resetContacts())} />

      <Block style={{ padding: '15px' }}>
        <ContactEditor onSubmit={handleEditorSubmit} />
      </Block>

      {contacts.length > 0 && (
        <Block style={{ padding: '10px' }}>
          <Filter
            value={filter}
            onChange={e => dispatch(setFilter(e?.target.value || ''))}
          />
        </Block>
      )}

      {filtered.length > 0 && (
        <Block maxHeight="70vh">
          <ContactList
            value={filtered}
            itemHeight="40px"
            controlsHeight="60%"
            onControlClick={handleControlClick}
          />
        </Block>
      )}

      <ToastContainer
        autoClose={1500}
        position="top-center"
        progressStyle={{ height: '3px' }}
      />
    </Container>
  );
};
