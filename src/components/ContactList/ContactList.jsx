import { string, oneOfType, number } from 'prop-types';
import { Controls } from './Controls/Controls';
import { controlsData } from './controlsData';
import { List, Item, Column } from './ContactList.styled';
import { useFilter, useContacts } from 'redux/hooks';
import { Block } from 'styles/shared';

//
// ContactList
//

export const ContactList = ({ controlsHeight, rowHeight }) => {
  const { filter } = useFilter();
  const { contacts } = useContacts();

  const filterContacts = () => {
    const searchStr = filter?.toLocaleLowerCase();

    return searchStr
      ? contacts?.filter(
          ({ name, number }) =>
            name.toLocaleLowerCase().includes(searchStr) ||
            number.includes(searchStr)
        )
      : contacts;
  };

  const filtered = filterContacts(contacts);
  if (!filtered.length) return null;

  return (
    <Block maxHeight="70vh">
      <List>
        {filtered.map(({ id, name, number }) => {
          return (
            <Item key={id} height={rowHeight}>
              <Column>{name}</Column>
              <Column>{number}</Column>
              <Column>
                <Controls
                  items={controlsData}
                  height={controlsHeight}
                  targetId={id}
                />
              </Column>
            </Item>
          );
        })}
      </List>
    </Block>
  );
};

ContactList.propTypes = {
  rowHeight: oneOfType([string, number]),
};
