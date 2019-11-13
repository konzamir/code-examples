import React from 'react';
import { CSSTransition } from 'react-transition-group';

import groupsService from 'services/groups';

import './index.scss';

const GroupsModal = ({isVisible, connect}) => {
  return (
    <CSSTransition
      classNames='groups-modal'
      timeout={500}
      in={isVisible}
      unmountOnExit
      onClick={e => e.stopPropagation()}
    >
      <div className='groups-modal'>
        {groupsService.getAllGroups().map((i, idx) => {
          return (
            <span
              key={idx}
              className='groups-modal-item'
              onClick={() => connect(i.uuid)}
            >
              {i.name}
            </span>
          );
        })}
      </div>
    </CSSTransition>
  );
};

export default GroupsModal;
