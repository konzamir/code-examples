import React, { useState, useContext, useRef, useCallback } from 'react';
import { useDispatch } from 'redux-react-hook';
import { Checkbox } from 'primereact/checkbox';
import { Growl } from 'primereact/growl';

import { setBackgroundUserLogo } from 'helpers/setBackground';
import userService from 'services/users';
import groupsService from 'services/groups';

import { PathContext } from 'App';
import { ModalContext } from 'App';
import { filtersActions } from 'store/actionTypes';
import ReportIcon from 'images/guide/ReportIcon';
import useModal from 'Hooks/useModal';
import GroupsModal from './Components/GroupModal';

import './index.scss';

const PersonResponseTemplate = (props) => {
  const ref = useRef(null);
  const [isVisibleGroups, setIsVisibleGroups] = useState(false);

  useModal(isVisibleGroups, () => setIsVisibleGroups(false), 'groups-modal');

  try {
    const {
      level,
      _checkbox,
      profile: {
        uuid,
        firstName,
        lastName,
        profileImage,
        address,
        email
      },
      education: {
        name
      }
    } = props.data;

    const { showModal, setRecipients, recipients } = useContext(ModalContext);
    const { currPath, changePath } = useContext(PathContext);

    const dispatch = useDispatch();

    const addRecipient = () => {
      let _includes = false;

      recipients.map(i => {
        if (i.uuid) {
          if (i.uuid === uuid) {
            _includes = true;
          }
        }
      });

      if (!_includes) {
        let __recipients = recipients.concat({ uuid, email });
        setRecipients(__recipients);
      }
    };

    const removeRecipient = () => {
      let _recipients = [];

      recipients.map(i => {
        if (i.uuid) {
          if (i.uuid !== uuid) {
            _recipients.push(i);
          }
        }
      });

      setRecipients(_recipients);
    };

    const checkIfChecked = (_uuid) => {
      let _isChecked = false;

      recipients.map(i => {
        if (i.uuid) {
          if (i.uuid === _uuid) {
            _isChecked = true;
          }
        }
      });

      return _isChecked;
    };

    const handleClickSendMessage = () => {
      addRecipient();
      showModal();
    };

    const handleConnect = (uuid) => {
      const props = { users: [{ email }], uuid };
      setIsVisibleGroups(false);

      userService.invite(props)
        .then(() => {
          ref.current.show({ severity: 'success', summary: 'Success', detail: 'Connected Successfully' });
        })
        .catch(err => {
          ref.current.show({
            severity: 'error',
            summary: 'Error',
            detail: `Connection to ${firstName + ' ' + lastName} failed`
          });
        });
    };

    const handleChangeCheckBox = e => {
      if (e.checked) {
        addRecipient();
      } else {
        removeRecipient();
      };
    };

    const handleClickUserStats = () => {
      dispatch({
        type: filtersActions.SET_UUID_FILTER,
        payload: [uuid]
      });

      changePath('/connections');
    };

    const handleOpenConnectModal = useCallback(
      () => {
        groupsService.getAllGroupsAsync()
          .then(() => {
            setIsVisibleGroups(!isVisibleGroups);
          });
      },
      []
    );

    return (
      <>
        <div className='user-avatar-legend'>
          {_checkbox && <Checkbox onChange={handleChangeCheckBox} checked={checkIfChecked(uuid)} />}
          <div className='user-avatar-legend-data'>
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => userService.goToProfilePage(props.data.profile)}
            >
              <div
                className='avatar'
                style={{
                  backgroundImage: `url(${setBackgroundUserLogo(profileImage)})`,
                  borderRadius: '50%',
                  backgroundColor: '#8ddc8d',
                }}
              />
              <div className='info'>
                <p className='user-name-degree'>
                  <span className='name'>{firstName} {lastName} </span>
                  {level === 1 ? '- 1st Degree' : level === 2 ? '- 2nd Degree' : null}
                </p>
                <p className='organization'>
                  {name || null}
                </p>
                <p className='location'>
                  {Array.isArray(address)
                    ? address.map((i, idx) => {
                      return (<span key={idx}>{i}</span>);
                    })
                    : <span>{address}</span>
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='user-result-actions'>

          {(level === 1) && <ReportIcon onClick={handleClickUserStats} />}

          {(level === 1 || currPath === '/added-to-profile') &&
            <button
              className='user-result-actions-btn action-message-btn'
              onClick={handleClickSendMessage}
            >
              MESSAGE
            </button>
          }

          {(level !== 1) &&
            <div>
              <button
                className='user-result-actions-btn action-connect-btn'
                onClick={handleOpenConnectModal}
              >
                CONNECT
              </button>

            </div>
          }
          <GroupsModal
            isVisible={isVisibleGroups}
            connect={handleConnect}
          />
        </div>
        <Growl ref={ref} />
      </>
    );
  } catch (error) {
    return null;
  }
};

export default PersonResponseTemplate;
