import { useDispatch, useSelector } from 'react-redux';
import { contactsActions } from './contactsSlice';
import { filterActions } from './filterSlice';

export const useFilter = () => {
  const dispatch = useDispatch();
  const { setFilter: setFilterAction } = filterActions;
  const filter = useSelector(state => state?.filter);
  const setFilter = value => dispatch(setFilterAction(value));

  // вместо [filter, setFilter] чтобы было единообразно с useContacts
  return { filter, setFilter };
};

export const useContacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state?.contacts);

  const dispatchedActions = Object.entries(contactsActions).reduce(
    (res, [actionName, func]) => {
      res[actionName] = value => dispatch(func(value));
      return res;
    },
    {}
  );

  // вместо [add, remove, ...] чтобы не привязываться к порядку в массиве
  return { contacts, ...dispatchedActions };
};
