import { string, number, objectOf, oneOfType, func } from 'prop-types';
import { ControlsList, Control, ControlBtn } from './Controls.styled';
import { getId, cap } from 'utils';
import { useContacts } from 'redux/hooks';
import { toast } from 'react-toastify';

const ACTION_NOT_SUPPORTED = 'Action not supported';

//
// Controls
// 

export const Controls = ({ value, targetId, height }) => {
  const { remove } = useContacts();

  const handleControlClick = (id, controlName) => {
    switch (controlName) {
      case 'delete':
        return remove(id);
      case 'edit':
        return toast.warn(ACTION_NOT_SUPPORTED);
      default:
    }
  };

  return (
    <ControlsList height={height}>
      {Object.entries(value).map(([name, Icon]) => {
        return (
          <Control key={getId()}>
            <ControlBtn
              type="button"
              title={cap(name)}
              onClick={() =>
                handleControlClick(targetId, name.toLocaleLowerCase())
              }
            >
              <Icon size="100%" />
            </ControlBtn>
          </Control>
        );
      })}
    </ControlsList>
  );
};

Controls.propTypes = {
  value: objectOf(func),
  targetId: string,
  height: oneOfType([string, number]),
};
