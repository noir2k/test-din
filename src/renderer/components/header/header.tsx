import { useAppDispatch } from '@hook/index';

import { setSettingOpen, setTestStartOpen } from '@store/slices/popupToggle';

import ico_home from '@assets/images/icons/icon_home.png';
import ico_settings from '@assets/images/icons/icon_settings.png';
import ico_user from '@assets/images/icons/icon_user.png';

const Header = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <div id="gnb" className="gnb bg-green-200">
        <nav className="nav flex justify-items-center mx-auto relative ">
          <ul className="flex items-end">
            <li className="flex flex-none justify-center mx-10">
              <a
                href="!#"
                onClick={() => {
                  dispatch(setTestStartOpen());
                }}
              >
                <img width="30vh" src={ico_user} alt="icon_home" />
              </a>
            </li>
            <li className="flex flex-none justify-center">
              <a
                href="#!"
                onClick={() => {
                  dispatch(setSettingOpen());
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
};

export default Header;
