/* eslint-disable camelcase */
import main_logo from '../../../../assets/images/main_logo.png';
import ico_home from '../../../../assets/images/icon_home.png';
import ico_settings from '../../../../assets/images/icon_settings.png';
import ico_user from '../../../../assets/images/icon_user.png';

export default function Header() {
  return (
    <div id="gnb" className="gnb">
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
            <a href="!#">
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
  );
}
