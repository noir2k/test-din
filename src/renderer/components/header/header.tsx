import { useDispatch, useSelector } from 'react-redux';
import {
  setNoticeVisible,
  setHistoryOpen,
  setSettingOpen,
  setTestStarted,
} from '@store/index';

import main_logo from '@assets/images/main_logo.png';
import ico_home from '@assets/images/icons/icon_home.png';
import ico_settings from '@assets/images/icons/icon_settings.png';
import ico_user from '@assets/images/icons/icon_user.png';

export default function Header() {
  const dispatch = useDispatch();

  return (
    <>
      <div id="gnb" className="gnb bg-green-200">
        <nav className="nav flex justify-items-center mx-auto relative ">
          <img
            width="150vh"
            src={main_logo}
            alt="main_logo"
            className="absolute left-10"
          />
          <ul className="flex items-end">
            <li className="flex flex-none justify-center mx-10">
              <a href="!#">
                <img width="30vh" src={ico_user} alt="icon_home" />
              </a>
            </li>
            <li className="flex flex-none justify-center">
              <a
                href="#!"
                onClick={() => {
                  dispatch(setSettingOpen(true));
                  dispatch(setNoticeVisible(false));
                  dispatch(setHistoryOpen(false));
                  dispatch(setTestStarted(false));
                }}
              >
                <img width="30vh" src={ico_settings} alt="icon_home" />
              </a>
            </li>
            <li className="flex flex-auto justify-center">
              <a href="!#">
                <img width="30vh" src={ico_home} alt="icon_home" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
